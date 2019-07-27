import {Component} from "react";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import '../styles/index.css';
import PetProfile from "./PetProfile"
import {BrowserRouter} from "react-router-dom";
import LineChart from './SimpleChart'


class Extras extends Component {
    constructor(props) {
        super(props);
        this.state = {
            petProfile: []
        }
    }

    componentWillMount() {
        const petProfile = [];
        petProfile.push(<PetProfile appContext={this}/>);
        this.setState({
            petProfile: petProfile
        });


    }


    render() {
        return (
            <BrowserRouter>
                <Grid container>
                    <Grid item xs={12}>
                        <Grid
                            container
                            spacing={16}
                            direction="column"
                            justify="space-around"
                            alignItems="center"
                        >
                            <Grid
                                item
                                className="extra-btn"
                                xs={12}
                                lg={4}
                                md={4}>
                                <Button
                                    className="btn-extra"
                                    variant="outlined"
                                    color="primary"
                                    size="large"
                                    href="/pet-profiles"

                                >
                                    Pet Profiles
                                </Button>
                            </Grid>
                            <Grid
                                className="extra-btn"
                                item
                                xs={12}
                                lg={4}
                                md={4}>
                                <Button
                                    className="btn-extra"
                                    variant="outlined"
                                    color="primary"
                                    size="large"

                                >
                                    Camera Feed
                                </Button>
                            </Grid>
                            <Grid
                                className="extra-btn"
                                item
                                xs={12}
                                lg={4}
                                md={4}>
                                <Button
                                    className="btn-extra"
                                    variant="outlined"
                                    color="primary"
                                    size="large"

                                >
                                    Laser Pointer
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </BrowserRouter>

        )
    }
}

export default Extras;