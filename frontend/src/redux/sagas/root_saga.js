import { takeEvery, all } from 'redux-saga/effects';
import { 
    FETCH_USER,
    CHECK_TOKEN,
    REGISTER_USER,
    UPDATE_PET_REQUEST,
    ADD_PET_REQUEST,
    SET_SCHEDULE_REQUEST
} from '../actions';
import { fetchUser, registerUser, checkToken } from './user_sagas';
import { updatePet, addPet } from './pet_sagas';
import { setSchedule } from './schedule_sagas';

export default function* rootSaga() {
    yield all([
        takeEvery(FETCH_USER, fetchUser),
        takeEvery(CHECK_TOKEN, checkToken),
        takeEvery(REGISTER_USER, registerUser),
        takeEvery(UPDATE_PET_REQUEST, updatePet),
        takeEvery(ADD_PET_REQUEST, addPet),
        takeEvery(SET_SCHEDULE_REQUEST, setSchedule),
    ])
}