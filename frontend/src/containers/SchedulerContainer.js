import Scheduler from '../components/Scheduler';
import { connect } from 'react-redux';
import ls from 'local-storage';
import { set_schedule_request, open_snackbar } from '../redux/actions';

const handleSubmit = (dispatch, form) => {
    let token = ls.get("token") || "";
    if (token !== "") {
        dispatch(set_schedule_request(form, token));
    }
}

const mapStateToProps = state => {
    return {
        auth : state.auth,
        pet_profiles : state.pet_profiles,
        schedules: state.schedules,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleSubmit: (form) => handleSubmit(dispatch, form),
        openSnackbar: (message, variant, horizontal, vertical) => dispatch(open_snackbar(message, variant, horizontal, vertical)),
    }
};

const SchedulerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Scheduler);

export default SchedulerContainer;