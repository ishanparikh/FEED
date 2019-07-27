#!/usr/bin/env python
import os
import requests
from flask import Flask, abort, request, jsonify, g, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_httpauth import HTTPBasicAuth
from flask_cors import CORS
from passlib.apps import custom_app_context as pwd_context
from itsdangerous import (TimedJSONWebSignatureSerializer
                          as Serializer, BadSignature, SignatureExpired)

# initialization
app = Flask(__name__)
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy dog'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app, supports_credentials=True)
# extensions
db = SQLAlchemy(app)
auth = HTTPBasicAuth()


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(32), index=True)
    first_name = db.Column(db.String(32))
    surname = db.Column(db.String(32))
    password_hash = db.Column(db.String(64))
    pi_address = db.Column(db.String(64))
    schedules = db.relationship('Schedule', backref='author', lazy=True)
    pets = db.relationship('Pet', backref='owner', lazy=True)

    def hash_password(self, password):
        self.password_hash = pwd_context.encrypt(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)

    def generate_auth_token(self, expiration=600):
        s = Serializer(app.config['SECRET_KEY'], expires_in=expiration)
        return s.dumps({'id': self.id})

    @staticmethod
    def verify_auth_token(token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except SignatureExpired:
            return None    # valid token, but expired
        except BadSignature:
            return None    # invalid token
        user = User.query.get(data['id'])
        return user

class Schedule(db.Model):
    __tablename__ = 'schedules'
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    pet = db.Column(db.Integer, db.ForeignKey('pets.id'), nullable=False)
    time = db.Column(db.String(32))
    bowl = db.Column(db.String(16))
    container = db.Column(db.String(16))
    weight = db.Column(db.Integer)
    repeat = db.Column(db.String(16))
    

class Pet(db.Model):
    __tablename__ = 'pets'
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(32), nullable=False)
    weight = db.Column(db.Integer)
    date_of_birth = db.Column(db.String(32))
    breed = db.Column(db.String(32))
    gender = db.Column(db.String(16))


@auth.verify_password
def verify_password(username_or_token, password):
    # first try to authenticate by token
    user = User.verify_auth_token(username_or_token)
    if not user:
        # try to authenticate with username/password
        user = User.query.filter_by(email=username_or_token).first()
        if not user or not user.verify_password(password):
            return False
    g.user = user
    return True


@app.route('/api/user/register', methods=['POST'])
def new_user():
    email = request.json.get('email')
    password = request.json.get('password')
    first_name = request.json.get('first_name')
    surname = request.json.get('surname')

    if email is None or password is None or first_name is None or surname is None:
        abort(400)
    if User.query.filter_by(email=email).first() is not None:
        return (
            jsonify({
                'error': 'Email already in use.'
            }),
            204,
        )

    user = User(email=email, first_name=first_name, surname=surname)
    user.hash_password(password)
    db.session.add(user)
    db.session.commit()
   
    return (
        jsonify({
            'email': user.email,
            'first_name': user.first_name,
            'surname': user.surname,
        }),
        201,
    )

@app.route('/api/user/pet', methods=['GET', 'POST', 'DELETE', 'PATCH'])
@auth.login_required
def pet():
    user_id = g.user.id
    
    if request.json:
        name = request.json.get('name', '')
        weight = request.json.get('weight', 0)
        date_of_birth = request.json.get('date_of_birth', '')
        breed = request.json.get('breed', '')
        gender = request.json.get('gender', '')
        id = request.json.get('id')

    status = 500

    if request.method == 'GET':
        return (
            jsonify({"pets": jsonifyPets(g.user.pets)}),
            200,
        )
    elif request.method == 'POST':
        pet = Pet(
            user=user_id,
            name=name,
            weight=weight,
            date_of_birth=date_of_birth,
            breed=breed,
            gender=gender
        )

        db.session.add(pet)
        db.session.commit()

        status = 201

    elif request.method == 'PATCH':
        if id is None:
            abort(400)
        
        pet = None
        for user_pet in g.user.pets:
            if user_pet.id == id:
                pet = user_pet
        
        if pet is None:
            abort(400)

        pet.name = name or pet.name
        pet.weight = weight or pet.weight
        pet.gender = gender or pet.gender
        pet.date_of_birth = date_of_birth or pet.date_of_birth
        pet.breed = breed or pet.breed
        
        db.session.commit()

        status = 200

    elif request.method == 'DELETE':
        if id is None:
            abort(400)
        
        Pet.query.filter(Pet.id == id).delete()
        db.session.commit()

        return "204"
    
    return (
        jsonify({
            'id': pet.id,
            'name': pet.name,
            'breed': pet.breed,
            'gender': pet.gender,
            'weight': pet.weight,
            'date_of_birth': pet.date_of_birth,
        }),
        status
    )
    

@app.route('/api/user/<int:id>')
def get_user(id):
    user = User.query.get(id)
    
    if not user:
        abort(400)

    return (
        jsonify({
            'email': user.email,
            'first_name': user.first_name,
            'surname': user.surname,
        }),
        200
    )


@app.route('/api/user/whoami', methods=["GET"])
@auth.login_required
def whoami():
    return (jsonify({
        'email': g.user.email,
        'first_name': g.user.first_name,
        'surname': g.user.surname,
        'pi_address': g.user.pi_address,
        'schedules': jsonifySchedules(g.user.schedules),
        'pets': jsonifyPets(g.user.pets),
    }), 200)


@app.route('/api/robot/turn/<int:id>')
@auth.login_required
def turn(id):
    if g.user.pi_address == "" or g.user.pi_address is None:
        return ('Pi address not found', 404)

    response = requests.get('http://' + g.user.pi_address + ':5000/turn/' + str(id))
    if (response.status_code == 200):
        return ('done', 200)
    else:
        return ('error', 502)

@app.route('/api/robot/register', methods=['POST'])
def register_robot():
    address = request.json.get('address')
    email = request.json.get('email')
    if address is None or email is None:
        abort(400)
    user = User.query.filter_by(email=email).first() 
    if user is None:
        abort(400) # user doesn't exist
    user.query.update({"pi_address" : address})

    return (jsonify({'pi_address' : address}), 200)


@app.route('/api/robot/schedule', methods=['POST', 'GET'])
@auth.login_required
def schedule():
    if g.user.pi_address == '' or g.user.pi_address is None:
        return ("Pi address not found", 404)
    
    if request.json:
        id = request.json.get('id', '')
        pet = request.json.get('pet', '')
        time = request.json.get('time', '')
        bowl = request.json.get('bowl', '')
        weight = request.json.get('weight', '')
        repeat = request.json.get('repeat', '')
        container = request.json.get('container', '')
    
    if request.method == 'GET':
        return (
            jsonify({
                "schedules": jsonifySchedules(g.user.schedules)
            }),
            200
        )
    elif request.method == 'POST':
        if not request.json:
            abort(400)

        if pet == '' or time == '' or bowl == '' or weight == '' or repeat == '' or container == '':
            abort(400)

        response = requests.post('http://' + g.user.pi_address + ':5000/schedule', json=request.json)

        if (response.status_code == 200):
            schedule = Schedule(
                pet= pet,
                user= g.user.id,
                time= time,
                bowl= bowl,
                weight = weight,
                repeat = repeat,
                container = container,
            )
            db.session.add(schedule)
            db.session.commit()
            return (jsonify({
                'id': schedule.id,
                'pet': schedule.pet,
                'time': schedule.time,
                'bowl': schedule.bowl,
                'weight': schedule.weight,
                'repeat': schedule.repeat,
                'container': schedule.container,
            }), 200)
        else:
            return (jsonify({
                'error': 'error'
            }), 502)


@app.route('/api/robot/feed', methods=["POST"])
@auth.login_required
def feed():
    if g.user.pi_address == "" or g.user.pi_address is None:
        return ("Pi address not found", 404)
    requests.get('http://' + g.user.pi_address + ':5000/feed')
    if (response.status_code == 200):
        return ('done', 200)
    else:
        return ('error', 502)
    return jsonify({'status' : 200})


@app.route('/api/user/token')
@auth.login_required
def get_auth_token():
    token = g.user.generate_auth_token(10000)
    return jsonify(
        {
            'token': token.decode('ascii'),
            'duration': 10000,
            'first_name': g.user.first_name,
            'surname': g.user.surname,
            'email': g.user.email,
            'pi_address': g.user.pi_address,
            'schedules': jsonifySchedules(g.user.schedules),
            'pets': jsonifyPets(g.user.pets),
        }
    )


def jsonifySchedules(schedules):
    json = {}
    for schedule in schedules:
        if schedule.pet not in json:
            json[schedule.pet] = {}
        json[schedule.pet][schedule.id] = {
            'id': schedule.id,
            'pet': schedule.pet,
            'time': schedule.time,
            'bowl': schedule.bowl,
            'weight': schedule.weight,
            'repeat': schedule.repeat,
            'container': schedule.container,
        }
    return json

def jsonifyPets(pets):
    return (
        { pet.id: {
            'id': pet.id,
            'name': pet.name,
            'breed': pet.breed,
            'gender': pet.gender,
            'weight': pet.weight,
            'date_of_birth': pet.date_of_birth,
        } for pet in pets }
    )

if __name__ == '__main__':
    if not os.path.exists('db.sqlite'):
        db.create_all()
    app.run(host='0.0.0.0', debug=True)
