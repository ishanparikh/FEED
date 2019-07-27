import Register from '../components/Register';
import { connect } from 'react-redux';
import { open_snackbar, register_user } from '../redux/actions';


const mapStateToProps = state => {
    return {
        auth : state.auth,
        pet_profiles : state.pet_profiles
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleSubmit: (form) => dispatch(register_user(form)),
        openSnackbar: (message, variant, horizontal, vertical) => dispatch(open_snackbar(message, variant, horizontal, vertical)),
    }
};

const RegisterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);

export default RegisterContainer;
