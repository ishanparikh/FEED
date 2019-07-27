import LoginScreen from '../components/LoginScreen';
import { connect } from 'react-redux';
import { open_snackbar, close_snackbar } from '../redux/actions';

const mapStateToProps = state => {
    return {
        snackbar: state.snackbar
    }
};

const mapDispatchToProps = dispatch => {
    return {
        openSnackbar: (message, variant, horizontal, vertical) => dispatch(open_snackbar(message, variant, horizontal, vertical)),
        closeSnackbar: () => dispatch(close_snackbar()),
    }
};

const LoginScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginScreen);

export default LoginScreenContainer;