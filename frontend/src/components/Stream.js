import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import '../styles/index.css';


class Stream extends Component {

    constructor(props) {
        super(props);
        this.state = {
            host: "",
        };
    }
    
    render() {  
        return (
            <Grid container direction="column" justify="center" alignItems="center">
                <Grid item>
                    <img alt="hi" src={'http://' + this.props.auth.pi_address + ':5000/video_feed'}/>
                </Grid>
                <Grid
                    container
                    direction='row'
                    justify='center'
                    alignItems='center'
                    className='padding-btn'
                >
                    <Grid container item xs={12} md={6} justify="center" alignItems='center'>
                        <Grid style={{marginBottom: '10px'}} container item justify='center' xs={12} md={6}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => this.props.turn(0)}
                            >
                                Left
                            </Button>
                        </Grid>
                        <Grid style={{marginBottom: '10px'}} container item justify='center' xs={12} md={6}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => this.props.turn(1)}
                            >
                                Right
                            </Button>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );

    }
}

export default Stream;