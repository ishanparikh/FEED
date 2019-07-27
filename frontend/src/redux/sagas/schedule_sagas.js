import { call, put } from 'redux-saga/effects';
import { set_schedule } from '../../services/schedule_service';
import { 
    add_feed_schedule,
    open_snackbar,
    log_out
} from '../actions';


export function* setSchedule(action) {
    try {
        const schedule = yield call(set_schedule, action.payload.form, action.payload.token);
        console.log(schedule);
        yield put(add_feed_schedule(schedule.data));
        yield put(open_snackbar("Schedule set successfully!", "success", "center", "top"));
    } catch (e) {
        console.log(e);
        let status = e.response.status;
        if (status === 401) {
            yield put(log_out());
            yield put(open_snackbar("Token expired. Please log in again.", "error", "center", "top"));
        } else if (status === 404) {
            yield put(open_snackbar("Couldn't find your pi's ip address, please restart it! (404)", "error", "center", "top"));
        } else if (status === 502) {
            yield put(open_snackbar("Request to pi failed, consider restarting it. (502)", "error", "center", "top"));
        } else {
            yield put(open_snackbar("There seems to be an error on our side. Please try again later.", "error", "center", "top"));
        }
    }
}
