import 'typeface-roboto'
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from '@material-ui/core/Tab';
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/es/Paper/Paper";
import LoginContainer from "../containers/LoginContainer";
import RegisterContainer from "../containers/RegisterContainer";
import Grid from "@material-ui/core/Grid";
import SwipeableViews from "react-swipeable-views";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from './SnackbarWrapper';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            loggedIn: false,
        }
    }

    handleChange = (event, value) => {
        this.setState({value});
    };

    handleChangeIndex = index => {
        this.setState({
            value: index,
        });
    };

    render() {
        return (
            <div className='App-header'>
                <Grid
                    container
                    alignItems='center'
                    justify='center'
                >
                    <Grid item xs={9} md={6} lg={4}>
                        <Card
                            raised={true}
                        >
                            <Paper>
                                <AppBar position="static" color="default">
                                    <Tabs
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                        variant='fullWidth'
                                        indicatorColor="primary"
                                        textColor="primary"
                                        centered
                                    >
                                        <Tab label="Login"/>
                                        <Tab label="Register"/>
                                    </Tabs>
                                </AppBar>
                                <SwipeableViews
                                    axis={"x"}
                                    index={this.state.value}
                                    onChangeIndex={this.handleChangeIndex}
                                    enableMouseEvents={true}
                                    resistance={true}
                                >
                                    <Typography component="div" dir={"x"} style={{padding: 8 * 3}}>
                                        <LoginContainer />
                                    </Typography>
                                    <Typography component="div" dir={"x"} style={{padding: 8 * 3}}>
                                        <RegisterContainer />
                                    </Typography>
                                </SwipeableViews>
                            </Paper>
                        </Card>
                    </Grid>
                    <Snackbar
                        anchorOrigin={{
                            vertical: this.props.snackbar.vertical,
                            horizontal: this.props.snackbar.horizontal,
                        }}
                        open={this.props.snackbar.open}
                        autoHideDuration={6000}
                        onClose={this.props.closeSnackbar}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                    >
                        <SnackbarContent
                            variant={this.props.snackbar.variant}
                            message={this.props.snackbar.message}
                            onClose={this.props.closeSnackbar}
                        />
                    </Snackbar>
                </Grid>
            </div>
        );
    }
}
