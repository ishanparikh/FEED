import { call, put } from 'redux-saga/effects';
import { get_user, check_token, register } from '../../services/user_service';
import ls from 'local-storage'
import { 
    set_user,
    set_pets,
    set_schedules,
    open_snackbar,
} from '../actions';

export function* fetchUser(action) {
    try {
        const user = yield call(get_user, action.payload);
        yield put(set_user(user.data));
        yield put(set_pets(user.data.pets));
        yield put(set_schedules(user.data.schedules));
        yield put(open_snackbar("Login successful!", "success", "center", "top"));
        ls.set("token", user.data.token);
    } catch (e) {
        console.log(e);
        yield put(open_snackbar("The entered username or password is incorrect.", "warning", "center", "top"));
    }
}

export function* checkToken(action) {
    try {
        const user = yield call(check_token, action.payload);
        user.data.token = action.payload;
        yield put(set_user(user.data));
        yield put(set_pets(user.data.pets));
        yield put(set_schedules(user.data.schedules));
        yield put(open_snackbar("Session restored.", "success", "center", "top"));
    } catch (e) {
        console.log(e);
    }
}

export function* registerUser(action) {
    try {
        let user = yield call(register, action.payload);
        if (user.status === 201) {
            user = yield call(get_user, { email_input: action.payload.email_input, password_input: action.payload.password_input});
            yield put(set_user(user.data));
            yield put(set_pets(user.data.pets));
            yield put(set_schedules(user.data.schedules));
            yield put(open_snackbar("Registered successfully!", "success", "center", "top"));
            ls.set("token", user.data.token);
        } else {
            yield put(open_snackbar("That email's already in use!", "warning", "center", "top"));
        }
    } catch (e) {
        console.log(e);
        yield put(open_snackbar("There's an error on our side, please try again later.", "error", "center", "top"));
    }
}
