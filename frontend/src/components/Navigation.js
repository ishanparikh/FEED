import React from "react";
import 'typeface-roboto';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import SwipeableViews from "react-swipeable-views";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import FEED from "../assets/images/FEED.png";
import Button from "@material-ui/core/Button";
import MediaQuery from "react-responsive";
import PetProfile from "../containers/PetProfileContainer";
import Stream from "../containers/StreamContainer";
import Analytics from "./Analytics";
import Scheduler from "../containers/SchedulerContainer";
import Homepage from "../containers/HomepageContainer";
import { Redirect } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from './SnackbarWrapper';

function TabContainer({children, dir}) {
    return (
        <Typography component="div" dir={dir} style={{padding: 8 * 3}}>
            {children}
        </Typography>
    );
}


class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        }
    }

    handleChange = (event, value) => {
        this.setState({value});
        console.log(this.state.value)
    };

    handleChangeIndex = index => {
        this.setState({
            value: index,
        });
    };

    handleLogOut() {
        this.props.handleLogOut();
    }

    handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.props.closeSnackbar();
    };

    render() {
        if (this.props.auth.token === "" || this.props.auth.token === undefined) {
            return (
               <Redirect 
                    to={{
                        pathname: "/",
                    }}
                /> 
            );
        }
        return (
            <Grid>
                <Grid
                    container
                    alignItems='center'
                    justify='center'
                >
                    <Grid item xs={12} md={12} lg={12}>
                        <Card>
                            <Paper>
                                <AppBar position="static" color="default" style={{display: 'inline-block'}}>
                                    <div>
                                        <img src={FEED} alt='' style={{height: '110px'}}/>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => this.handleLogOut()}
                                            style={{
                                                position: 'absolute',
                                                right: 20,
                                                top: 20
                                            }}
                                        >
                                            Log Out
                                        </Button>
                                    </div>
                                    <MediaQuery maxWidth={600}>
                                        {(matches) => {
                                            if (matches) {
                                                return <Tabs
                                                    value={this.state.value}
                                                    onChange={this.handleChange}
                                                    variant='scrollable'
                                                    indicatorColor="primary"
                                                    textColor="primary">
                                                    <Tab
                                                        label="Home"
                                                        href="#home"
                                                    />
                                                    <Tab
                                                        label="Pet Profiles"
                                                        href="#pet-profiles"
                                                    />
                                                    <Tab
                                                        label="Schedule"
                                                        href="#schedule"
                                                    />

                                                    <Tab
                                                        label="Camera Feed"
                                                        href="#camera-feed"
                                                    />
                                                    <Tab
                                                        label="Pet Analytics"
                                                        href="#pet-analytics"
                                                    />
                                                </Tabs>;
                                            } else {
                                                return <Tabs
                                                    value={this.state.value}
                                                    onChange={this.handleChange}
                                                    variant='standard'
                                                    centered={true}
                                                    indicatorColor="primary"
                                                    textColor="primary">
                                                    <Tab
                                                        label="Home"
                                                        href="#home"
                                                    />
                                                    <Tab
                                                        label="Pet Profiles"
                                                        href="#pet-profiles"
                                                    />
                                                    <Tab
                                                        label="Schedule"
                                                        href="#schedule"
                                                    />
                                                    <Tab
                                                        label="Camera FE.Ed"
                                                        href="#camera-feed"
                                                    />
                                                    <Tab
                                                        label="Pet Analytics"
                                                        href="#pet-analytics"
                                                    />
                                                </Tabs>;
                                            }
                                        }}
                                    </MediaQuery>

                                </AppBar>
                                <SwipeableViews
                                    axis={"x"}
                                    index={this.state.value}
                                    onChangeIndex={this.handleChangeIndex}
                                    enableMouseEvents={true}
                                    resistance={true}
                                >
                                    <TabContainer dir={'x'} state={this.state}>
                                        <Homepage />
                                    </TabContainer>
                                    <TabContainer dir={'x'} state={this.state}>
                                        <PetProfile />
                                    </TabContainer>
                                    <TabContainer dir={'x'} state={this.state}>
                                        <Scheduler />
                                    </TabContainer>
                                    <TabContainer dir={'x'} state={this.state}>
                                        <Stream />
                                    </TabContainer>
                                    <TabContainer dir={'x'} state={this.state}>
                                        <Analytics />
                                    </TabContainer>
                                </SwipeableViews>
                            </Paper>
                        </Card>
                    </Grid>
                </Grid>
                <Snackbar
                        anchorOrigin={{
                            vertical: this.props.snackbar.vertical,
                            horizontal: this.props.snackbar.horizontal,
                        }}
                        open={this.props.snackbar.open}
                        autoHideDuration={6000}
                        onClose={this.handleSnackbarClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                    >
                        <SnackbarContent
                            variant={this.props.snackbar.variant}
                            message={this.props.snackbar.message}
                            onClose={this.handleSnackbarClose}
                        />
                </Snackbar>
            </Grid>
        );
    }
}

export default Navigation;