import React from "react";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker } from 'material-ui-pickers';
import Grid from "@material-ui/core/Grid";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import 'typeface-roboto'
import Card from "@material-ui/core/Card";
import '../../styles/index.css';
import Divider from "@material-ui/core/Divider";
import TextField from '@material-ui/core/TextField/TextField'
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment'
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel'
import Radio from '@material-ui/core/Radio/Radio'
import RadioGroup from '@material-ui/core/RadioGroup/RadioGroup'
import FormControl from "@material-ui/core/FormControl";
import { Divider as HiddenDivider } from 'semantic-ui-react';


export default class ScheduleForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            time: new Date(),
            container: "",
            bowl: "",
            weight: "",
            repeat: "",
        }

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleDropChange = this.handleDropChange.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleDateChange = date => {
        this.setState({time: date});
    };

    handleFormChange(e) {
        this.setState({[e.target.id]: e.target.value})
    }

    handleChange = event => {
        this.setState({repeat: event.target.value});
    };

    handleInputChange = (e) => {
        let input = e.target;
        let name = e.target.name;
        let value = input.value;

        this.setState({
            [name]: value
        })
    };

    handleDropChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleSubmit() {
        let flag = false;
        if (this.state.name === "") flag = true;
        if (this.state.container === "") flag = true;
        if (this.state.bowl === "") flag = true;
        if (this.state.weight === "") flag = true;
        if (this.state.repeat === "") flag = true;

        if (flag) {
            this.props.openSnackbar("Please fill out the whole form!", "warning", "center", "top");
            return;
        }
        this.props.handleSubmit(this.state);
    }

    render() {

        let petNames = [];
        for (let key in this.props.pet_profiles) {
            let id = this.props.pet_profiles[key].id;
            let name = this.props.pet_profiles[key].name;
            petNames.push(<MenuItem key={id} value={id}>{name}</MenuItem>);
        }
      
        return (
            <Grid>
                <Grid container item justify="center" alignItems="center" style={{marginTop: '10px'}} xs={12}
                        sm={6}>
                    <Typography variant="h5" color="secondary" align="center">
                        Feed your pets
                    </Typography>
                </Grid>
                <HiddenDivider style={{marginTop: '20px'}} variant="variant"/>
                <Grid container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        xs={12} sm={6}>

                    <Card style={{padding:'40px'}}>
                        <HiddenDivider style={{marginTop: '20px'}} variant="variant"/>
                        <Grid container
                                direction="column"
                                justify="center"
                                alignItems="center"
                                spacing={16}
                        >

                            <Grid item container xs={12} md={2} justify="center" alignItems="center">
                                <Grid item container justify="center">
                                    <FormControl variant="outlined" style={{minWidth: 120}}>
                                        <InputLabel
                                        >
                                            Pet Name
                                        </InputLabel>
                                        <Select
                                            value={this.state.name}
                                            onChange={this.handleDropChange}
                                            input={
                                                <OutlinedInput
                                                    name="name"
                                                    id="name"
                                                    fullWidth={true}
                                                    labelWidth={7}>
                                                    Pet Name
                                                </OutlinedInput>
                                            }
                                        >
                                            {petNames}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid container item xs={12} md={2} justify="center" alignItems="center">
                                <Grid container item justify="center">
                                    <FormControl variant="outlined" style={{minWidth: 120}}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <Grid container item justify="center">
                                                <TimePicker
                                                    id='time'
                                                    ampm={false}
                                                    margin="normal"
                                                    label="Time"
                                                    value={this.state.time}
                                                    onChange={this.handleDateChange}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </MuiPickersUtilsProvider>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} md={2} justify="center" alignItems="center">
                                <Grid container item justify="center">
                                    <FormControl variant="outlined" style={{minWidth: 120}}>
                                        <InputLabel
                                        >
                                            Bowls
                                        </InputLabel>
                                        <Select
                                            value={this.state.bowl}
                                            onChange={this.handleDropChange}
                                            input={
                                                <OutlinedInput
                                                    name="bowl"
                                                    id="bowl"
                                                    labelWidth={5}>
                                                    Bowls
                                                </OutlinedInput>
                                            }
                                        >
                                            <MenuItem value='Left'>Left</MenuItem>
                                            <MenuItem value="Right">Right</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} md={2} justify="center" alignItems="center">
                                <Grid container item justify="center">
                                    <FormControl variant="outlined" style={{minWidth: 120}}>
                                        <InputLabel
                                        >
                                            Container
                                        </InputLabel>
                                        <Select
                                            value={this.state.container}
                                            onChange={this.handleDropChange}
                                            input={
                                                <OutlinedInput
                                                    name="container"
                                                    id="container"
                                                    labelWidth={5}>
                                                    Container
                                                </OutlinedInput>
                                            }
                                        >
                                            <MenuItem value='Left'>Left</MenuItem>
                                            <MenuItem value="Right">Right</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} md={2} justify="center" alignItems="center">
                                <Grid container item justify="center">
                                    <FormControl variant="outlined" style={{minWidth: 120}}>
                                        <TextField
                                            id="weight"
                                            className='field'
                                            variant="outlined"
                                            label="Amount"
                                            required={true}
                                            value={this.state.weight}
                                            onChange={this.handleFormChange}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">g</InputAdornment>,
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid container item xs={12} md={2} justify="center" alignItems="center"
                                    direction="row">
                                <Grid container item justify="center" direction="row">
                                    <RadioGroup
                                        aria-label="repeat"
                                        name="repeat"
                                        value={this.state.repeat}
                                        onChange={this.handleChange}
                                    >
                                        <FormControlLabel value='false' control={<Radio/>} label="One off"/>
                                        <FormControlLabel value='true' control={<Radio/>} label="Daily"/>
                                    </RadioGroup>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>

                    <Divider style={{marginTop: '20px'}} variant="middle"/>
                    <Grid container item xs={12} justify="center" alignItems="center">
                        <Button
                            onClick={() => this.handleSubmit()}
                            variant="outlined" color="primary">FE.ED
                        </Button>
                    </Grid>

                </Grid>
            </Grid>
        );
    }
}