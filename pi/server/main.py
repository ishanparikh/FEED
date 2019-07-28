
from flask import Flask, render_template, Response, request, abort
from camera.camera import VideoCamera
import socket
import requests
import subprocess
from arduino.read import read_weight
import time
from flask_cors import CORS
from crontab import CronTab
from arduino import read

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(gen(VideoCamera()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/feed', methods=["GET"])
def feed():
    subprocess.call("./server/run 1")

@app.route('/turn/<int:id>')
def turn(id):
    print("Turning " + str(id))
    subprocess.call(['./server/turn', str(id)])
    return "200"

@app.route('/schedule', methods=["POST"])
def schedule():
    print("HIIIIIIIII")
    if not request.json:
        abort(400)
    else:
        print(request.json)
        dt = request.json.get("time", "")
        if dt != "":
            dt = dt.split("T")
            time = dt[1].split(':')
            hour = time[0]
            minute = time[1]
            bowl = request.json.get("bowl", "1")
            bowlNum = 1
            if bowl == "Right":
                bowlNum = 2
            print(bowlNum)
            cron = CronTab(user='student')

            job = cron.new(command='./run ' + str(bowlNum), comment='Feed!')
            job.hour.on(hour)
            job.minute.on(minute)
            cron.write()

        return request.json.get('weight', 12)

if __name__ == '__main__':
    print("IP ADDRESS:")
    host = socket.gethostbyname(socket.gethostname())
    requests.post("http://192.168.43.51:5000/api/robot/register",
            json={'address': '192.168.43.240', 'email':'bob@test.com'})
    cron = CronTab(user='student')
    job = cron.new(command='/usr/bin/python2.7 /home/student/server/bluetooth/btScan.py')
    job.minute.every(1)
    cron.write()
    app.run(host='0.0.0.0', debug=True)

	






