import { call, put } from 'redux-saga/effects';
import { update_pet_request, add_pet_request } from '../../services/pet_service';
import { 
    update_pet,
    add_pet,
    open_snackbar
} from '../actions';


export function* updatePet(action) {
    try {
        const pet = yield call(update_pet_request, action.payload.form, action.payload.token);
        yield put(update_pet(pet.data));
        yield put(open_snackbar("Updated profile successfully.", "success", "center", "top"));
    } catch (e) {
        console.log(e);
        yield put(open_snackbar("There seems to be an error on our side. Please try again later.", "error", "center", "top"));
    }
}

export function* addPet(action) {
    try {
        const pet = yield call(add_pet_request, action.payload.form, action.payload.token);
        yield put(add_pet(pet.data));
    } catch (e) {
        console.log(e);
        yield put(open_snackbar("There seems to be an error on our side. Please try again later.", "error", "center", "top"));
    }
}
