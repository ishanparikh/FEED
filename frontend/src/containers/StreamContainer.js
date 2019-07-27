import Stream from '../components/Stream';
import { connect } from 'react-redux';
import { set_pi_address, log_out, open_snackbar } from '../redux/actions';
import { SERVER } from '../util/config';
import ls from 'local-storage';
import axios from "axios";


const get_pi_address = (dispatch) => {

    axios.get(SERVER + "api/user/whoami", {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        auth: {
            username : ls.get("token"),
            password : "",
        }
    }).then(function (response) {
        console.log(response);
        if (response.data.pi_address == null) {
            dispatch(open_snackbar("Pi address not found, consider restarting your pi.", "error", "center", "top"));
        } else {
            dispatch(set_pi_address(response.data.pi_address));
        }
    }).catch(function (error) {
        console.log(error);
        if (error.response.status === 401) {
            dispatch(open_snackbar("Token expired. Please log in again.", "error", "center", "top"));
            dispatch(log_out());
        } else {
            dispatch(open_snackbar(error, "error", "center", "top"));
        }
    });
}

const turn = (dispatch, n) => {
    console.log("Turning " + n);
    axios.get(SERVER + "api/robot/turn/" + n, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        auth: {
            username : ls.get("token"),
            password : "",
        }
    }).then(function (response) {
        console.log(response);
        dispatch(open_snackbar("Turning", "success", "center", "top"));
    }).catch(function (error) {
        console.log(error);     
        if (error.response !== undefined) {
            let status = error.response.status;
            if (status === 401) {
                dispatch(open_snackbar("Token expired. Please log in again.", "error", "center", "top"));
                dispatch(log_out());
            } else if (status === 404) {
                dispatch(open_snackbar("Couldn't find your pi's ip address, please restart it! (404)", "error", "center", "top"));
            } else if (status === 502) {
                dispatch(open_snackbar("Request to pi failed, consider restarting it. (502)", "error", "center", "top"));
            }
        } else {
            dispatch(open_snackbar(error, "error", "center", "top"));
        }
    });
}

const mapStateToProps = state => {
    return {
        auth : state.auth,
        pet_profiles : state.pet_profiles
    }
};

const mapDispatchToProps = dispatch => {
    return {
        get_pi_address: () => get_pi_address(dispatch),
        turn: (n) => turn(dispatch, n),
    }
};

const StreamContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Stream);

export default StreamContainer;