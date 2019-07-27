import { Component } from 'react';
import '../../styles/forms.css';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import '../../styles/index.css';
import 'typeface-roboto';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import Button from '@material-ui/core/Button';
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

export default class PetForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id || 0,
            name: this.props.name || "New Pet",
            weight: this.props.weight || "",
            dateOfBirth: this.props.dateOfBirth || new Date(),
            breed: this.props.breed || "",
            gender: this.props.gender || "",
            image: this.props.image || {},
            image_uploaded: this.props.image_uploaded || false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleImageInput = this.handleImageInput.bind(this);
    }

    handleSubmit() {
        let flag = false;
        if (this.state.name === "") flag = true;
        if (this.state.weight === "") flag = true;
        if (this.state.breed === "") flag = true;
        if (this.state.gender === "") flag = true;
        if (flag) {
            this.props.openSnackbar("Please fill out the whole form!", "warning", "center", "top");
            return;
        }
        this.props.handleSubmit(this.state);
    }

    handleFormChange(e) {
        if (e.target !== undefined) {
            this.setState({[e.target.id]: e.target.value})
        } else {
            this.setState({dateOfBirth: e})
        }
    }
    
    handleImageInput(files) {
        this.setState({
            image: files.target.files[0],
            image_uploaded: true
        });
    }

    handleChange(event) {
        this.setState({gender: event.target.value})
    }

    render() {
        return (
            <Grid className="pet-grid" item xs={12} sm={4}>
                <Card
                    className="pet-card"
                >
                    <Grid container direction="column"
                            justify="center"
                            alignItems="center">
                        <CardHeader
                            title={this.props.name}
                        />
                        <CardContent style={{justifyContent: "center"}}>
                            <Grid container direction="column"
                                    justify="flex-start"
                                    alignItems="center">
                                <Grid item container justify="center" xs={12}>
                                    <Grid item>
                                        <TextField
                                            id="name"
                                            label="Name"
                                            type="string"
                                            margin="normal"
                                            variant="outlined"
                                            fullWidth={true}
                                            required={true}
                                            className="field"
                                            value={this.state.name}
                                            onChange={this.handleFormChange}
                                            style = {{width: 200}}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item container justify="center" xs={12}>
                                    <Grid item>
                                        <TextField
                                            id="weight"
                                            className="field"
                                            variant="outlined"
                                            label="Weight"
                                            value={this.state.weight}
                                            onChange={this.handleFormChange}
                                            InputProps={{
                                                endAdornment: <InputAdornment
                                                    position="end">Kg</InputAdornment>,
                                            }}
                                            style = {{width: 200}}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item container justify="center" xs={12}>
                                    <Grid item style = {{width: 200}}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DatePicker
                                                id="dateOfBirth"
                                                variant="outlined"
                                                margin="normal"
                                                label="Date of Birth"
                                                value={this.state.dateOfBirth}
                                                onChange={this.handleFormChange}
                                                disableFuture
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                </Grid>
                                <Grid item container justify="center" xs={12}>
                                    <Grid item>
                                        <TextField
                                            id="breed"
                                            label="Breed"
                                            fullWidth={true}
                                            type='string'
                                            margin="normal"
                                            variant="outlined"
                                            required={true}
                                            className='field'
                                            value={this.state.breed}
                                            onChange={this.handleFormChange}
                                            style = {{width: 200}}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item container justify="center" xs={12}>
                                    <Grid item style = {{width: 200}}>
                                        <FormControl>
                                            <InputLabel htmlFor="component-helper">Upload</InputLabel>
                                            <Input
                                                id="image"
                                                type="file"
                                                onChange={this.handleImageInput}
                                            />

                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid item container justify="center" xs={12}>
                                    <Grid item>
                                        <RadioGroup
                                            id="gender"
                                            aria-label="Gender"
                                            name="gender"
                                            value={this.state.gender}
                                            onChange={this.handleChange}
                                        >
                                            <FormControlLabel value="female" control={<Radio/>}
                                                                label="Female"/>
                                            <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                                        </RadioGroup>
                                    </Grid>
                                    
                                </Grid>
                                <Grid item container justify="center" xs={12}>
                                    <Grid item>
                                        <Button onClick={() => this.handleSubmit()} variant="outlined" color="primary">
                                            Update
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Grid>
                </Card>
            </Grid>
        );
    }
}