import Login from '../components/Login';
import { open_snackbar, fetch_user, check_token } from '../redux/actions';
import { connect } from 'react-redux';
import ls from 'local-storage'


const checkTokenValidity = (dispatch) => {
    const token = ls.get("token") || "";
    if (token !== "") {
        dispatch(check_token(token));
    }   
}

const mapStateToProps = state => {
    return {
        auth : state.auth,
        pet_profiles : state.pet_profiles,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleLoginFormSubmit: (form) => dispatch(fetch_user(form)),
        checkTokenValidity: () => checkTokenValidity(dispatch),
        openSnackbar: (message, variant, horizontal, vertical) => dispatch(open_snackbar(message, variant, horizontal, vertical)),
    }
};

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default LoginContainer;