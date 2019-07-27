import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import 'typeface-roboto'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import '../styles/index.css';
import Divider from "@material-ui/core/Divider";
import SimpleTable from './SimpleTable';
import { Divider as HiddenDivider} from 'semantic-ui-react';

export default class ScheduleTable extends React.Component {
    constructor(props) {
        super(props);
        this.renderTables = this.renderTables.bind(this);
    }

    renderTables() {
        let tables = [];
        let schedules = this.props.schedules;
        let profiles = this.props.pet_profiles;
        for (let key in profiles) {
            tables.push(
                <Card
                    className='pet-card'
                    xs={12}
                    sm={6}
                >
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h6" align="center">
                            {profiles[key].name}
                        </Typography>
                        <SimpleTable items={schedules[key]}/>
                    </CardContent>
                </Card>
            );
            tables.push(
                <HiddenDivider style={{marginTop: '30px'}} variant="variant"/>
            );
        }
        return tables;
    }

    render() {
        let tables = this.renderTables();
        return (
            <Grid container xs={12} sm={6} justify="flex-start">
                <Grid container item justify="center" alignItems="center" direction="column" xs={12} sm={6}>
                    <Typography variant="h5" color="secondary" xs={12}
                                sm={6}>
                        Scheduling Table
                    </Typography>
                    <HiddenDivider style={{marginTop: '20px'}} variant="variant"/>
                    {tables}
                </Grid>
                <Grid container item justify="center" alignItems="center" xs={12} sm={6}>
                    <Grid container item justify="center" alignItems="center">
                        <Divider style={{marginTop: '20px'}} variant="middle"/>
                        <Typography variant="body1" align="center" gutterBottom>
                            &copy; FE.ED
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}