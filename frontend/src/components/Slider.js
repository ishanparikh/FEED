import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';

const styles = {
    root: {
        width: 300,
    },
    slider: {
        padding: '22px 0px',
    },
    color: "secondary"
};

function SimpleSlider1(props) {
    const {classes} = props;

    const value = props.value;

    return (
        <div className={classes.root}>
            <Slider
                classes={{container: classes.slider}}
                value={value}
                aria-labelledby="label"
                color="secondary"
            />
        </div>
    );

}

SimpleSlider1.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSlider1);
