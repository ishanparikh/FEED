import { Component } from 'react';
import '../styles/forms.css';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import '../styles/index.css';
import 'typeface-roboto';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import PetForm from './forms/PetForm';
import { Button } from '@material-ui/core';

class PetProfile extends Component {

    constructor(props) {
        super(props);
        this.handleSubmitPet = this.handleSubmitPet.bind(this);
        this.petFormFactory = this.petFormFactory.bind(this);
        this.emptyPetFormFactory = this.emptyPetFormFactory.bind(this);
        this.addPetForm = this.addPetForm.bind(this);
    }

    handleSubmitPet(form) {
        if (form.id === "new") {
            this.props.addPetProfile(form);
        } else {
            this.props.updatePetProfile(form);
        }        
    }

    petFormFactory(form) {
        return (
            <PetForm 
                key={form.id}
                id={form.id}
                name={form.name}
                weight={form.weight}
                dateOfBirth={form.dateOfBirth}
                gender={form.gender}
                image={form.image}
                breed={form.breed}
                image_uploaded={form.image_uploaded}
                handleSubmit={this.handleSubmitPet}
                openSnackbar={this.props.openSnackbar}
            />
        );        
    }

    emptyPetFormFactory() {
        return (
            {
                id: "new",
                name: "",
                weight: "",
                dateOfBirth: new Date(),
                gender: "",
                image: [],
                image_uploaded: false,
            }
        )
    }

    addPetForm() {
        this.handleSubmitPet(this.emptyPetFormFactory());
    }

    render() {

        let profiles = [];
        for (let key in this.props.pet_profiles) {
            profiles.push(this.petFormFactory(this.props.pet_profiles[key]));
        }
        
        if (profiles.length === 0) {
            this.addPetForm();
        }

        return (
            <Grid
                container
                justify='center'
                alignItems='center'
                direction="column"
            >
                <Grid
                    container
                    justify='center'
                    alignItems='center'
                    direction="row"
                >
                    <Grid container justify='center' alignItems='center' direction='row'>
                        {profiles}
                        {profiles.length < 2 ? 
                            <Button onClick={() => this.addPetForm()} variant="outlined" color="primary">
                                Add Pet
                            </Button> : null
                        }
                    </Grid>
                </Grid>
                <Divider style={{paddingTop: '10px'}} variant="middle"/>
                <Typography variant="body1" align="center" gutterBottom>
                    &copy; FE.ED
                </Typography>
            </Grid>
        )
    }
}

export default PetProfile;