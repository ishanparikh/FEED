import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import 'typeface-roboto'
import '../styles/index.css';
import ScheduleForm from './forms/ScheduleForm';
import ScheduleTable from './ScheduleTable';

export default class Scheduler extends React.Component {
    constructor(props) {
        super(props);      
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit = (form) => {
        console.log(form);
        form.pet = form.name;
        this.props.handleSubmit(form);
    }

    render() {
        if (Object.keys(this.props.pet_profiles).length <= 0) {
            return (
                <Typography variant="h4" color="primary" align="center">
                    Please set your Pet Profiles
                </Typography>
            );
        }
        
        return (
            <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center" >
                <Grid container  justify="center" alignItems="center" style={{marginTop: '10px'}}>
                    <Grid item justify="center" xs={12} >
                        <Typography variant="h4" color="secondary" align="center">
                            Set Schedule here...
                        </Typography>
                    </Grid>
                </Grid>
                <ScheduleForm openSnackbar={this.props.openSnackbar} handleSubmit={(form) => this.handleSubmit(form)} pet_profiles={this.props.pet_profiles}/>
                <ScheduleTable schedules={this.props.schedules} pet_profiles={this.props.pet_profiles}/>
            </Grid>
        );
    }
}
