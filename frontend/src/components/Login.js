import {Component} from "react";
import TextField from "@material-ui/core/TextField";
import "../styles/forms.css";
import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/es/Typography/Typography";
import 'typeface-roboto'
import { Redirect } from "react-router-dom";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email_input: '',
            password_input: '',        
        };
        this.handleFormChange = this.handleFormChange.bind(this);
        this.formIsValid = this.formIsValid.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }

    handleFormChange(e) { 
        this.setState({[e.target.id] : e.target.value}); 
    }

    handleLoginSubmit = () => {
        if (this.formIsValid(this.state.email_input, this.state.password_input)) {
            this.props.handleLoginFormSubmit(this.state);
        }
    }

    componentDidMount() {
        this.props.checkTokenValidity();
    }

    formIsValid = (email_address, password) => {
        let error_msg = "";
    
        if (email_address === "") {
            error_msg += "Email, "
        }
        if (password === "") {
            error_msg += "Password, "
        }
        if (error_msg !== "") {
            error_msg += " Cannot be empty!";
            this.props.openSnackbar(error_msg, "warning", "center", "top");
            return false;
        }else {
            return true;
        }
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
                        Hello
                    </Typography>
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
                    <Button onClick={() => this.handleLoginSubmit()} variant="outlined" color="primary">
                        Login
                    </Button>
                </Grid>
            </Grid>
        )
    }
}

export default Login;
