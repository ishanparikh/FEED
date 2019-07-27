import 'typeface-roboto'
import { Component } from "react";
import TextField from '@material-ui/core/TextField';
import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Redirect } from "react-router-dom";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email_input: '',
            password_input: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.emailIsValid = this.emailIsValid.bind(this);
        this.validate_fields = this.validate_fields.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    emailIsValid = (email_address) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email_address);
    }

    handleSubmit = () => {
        if (this.validate_fields(
            this.state.first_name,
            this.state.last_name,
            this.state.email_input,
            this.state.password_input)
        ) {
            this.props.handleSubmit(this.state);
        }
    }

    validate_fields = (first_name,last_name,email_address,password) => {

        let error_msg = "";
        let flag = false;

        if (first_name === "") {
            flag = true;
        }
        if (last_name === "") {
            flag = true;
        }
        if (email_address === "") {
            flag = true;
        }
        if (password === "") {
            flag = true;
        }
        if (error_msg !== "") {
            flag = true;
        }
        if (this.emailIsValid(email_address) === false){
            flag = true;
            error_msg += "Email address is not valid!"
        }
        if (flag){
            error_msg = "Please fill out the whole form. " + error_msg;
            this.props.openSnackbar(error_msg, "warning", "center", "top");
            return false;
        }else {
            return true;
        }
    }

    handleFormChange(e) { 
        this.setState({[e.target.id] : e.target.value}); 
    }

    render() {
        if (this.props.auth.token !== "" && this.props.auth.token !== undefined) {
            return (
                <Redirect 
                    to={{
                        pathname: "/home",
                    }}
                />
            );
        }
        return (
            <Grid
                className='form-group'
                container
                justify='flex-start'
                alignItems='center'
                direction="column"
            >
                <Grid item xs={12} md={12}>
                    <Typography variant='h4' color='primary'>
                        Welcome
                    </Typography>
                </Grid>
                <Grid item container xs={12} justify='center'>
                    <Grid item md={6}>
                        <TextField
                            id="first_name"
                            label="First Name"
                            type='string'
                            margin="normal"
                            variant="outlined"
                            fullWidth={true}
                            required={true}
                            className='field'
                            onChange={this.handleFormChange}
                        />
                    </Grid>
                </Grid>
                <Grid item container xs={12} justify='center'>
                    <Grid item md={6}>
                        <TextField
                            id="last_name"
                            label=" Last name"
                            type='string'
                            margin="normal"
                            variant="outlined"
                            fullWidth={true}
                            required={true}
                            className='field'
                            onChange={this.handleFormChange}
                        />
                    </Grid>
                </Grid>
                <Grid item container xs={12} justify='center'>
                    <Grid item md={6}>
                        <TextField
                            id="email_input"
                            label="Email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="outlined"
                            fullWidth={true}
                            required={true}
                            className='field'
                            value={this.state.email_address}
                            onChange={this.handleFormChange}
                        />
                    </Grid>
                </Grid>
                <Grid item container xs={12} justify='center'>
                    <Grid item md={6}>
                        <TextField
                            id="password_input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                            fullWidth={true}
                            required={true}
                            className='field'
                            onChange={this.handleFormChange}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        onClick={() => this.handleSubmit()}
                        variant="outlined" color="primary">
                        Register
                    </Button>
                </Grid>
            </Grid>
            );
        }
}

export default Register;