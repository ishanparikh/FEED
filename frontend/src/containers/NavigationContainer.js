import Navigation from '../components/Navigation';
import { connect } from 'react-redux';
import { log_out, close_snackbar, open_snackbar } from '../redux/actions';
import ls from "local-storage";

const handleLogOut = (dispatch) => {
    ls.set('token', '');
    dispatch(open_snackbar("Log out successful!", "success", "center", "top"));
    dispatch(log_out());
}

const mapStateToProps = state => {
    return {
        auth : state.auth,
        pet_profiles : state.pet_profiles,
        snackbar: state.snackbar,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleLogOut: () => handleLogOut(dispatch),
        closeSnackbar: () => dispatch(close_snackbar())
    }
};

const NavigationContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Navigation);

export default NavigationContainer;