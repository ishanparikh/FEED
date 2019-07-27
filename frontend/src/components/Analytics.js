import {Component} from "react";
import Grid from "@material-ui/core/Grid";
import React from "react";
import SimpleChart from "./SimpleChart";
import connect from "react-redux/es/connect/connect";


class Analytics extends Component {
    constructor(props){
        super(props);
        this.state ={
            pet_name_1: 'Chimchar',
            pet_name_2: 'Snorlax'
        }
    }

    render() {
        return (
            <Grid container
                  direction="column"
                  justify='center'
                  alignItems='center'
                  spacing={16}
                  >
                <Grid item  container direction='row' justify='space-around' alignItems='center'>
                    <Grid item xs={12} md={5}>
                        <SimpleChart title={{text: this.state.pet_name_1}}/>
                    </Grid>
                    <Grid item xs={12} md={5}>

                        <SimpleChart title={{text:this.state.pet_name_2}}/>

                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        set_pet_profile1: state,
    }
};

const AnalyticsContainer = connect(
    mapStateToProps,
    null
)(Analytics);

export default AnalyticsContainer;
