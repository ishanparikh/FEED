import PetProfile from '../components/PetProfile';
import { update_pet_request, open_snackbar, add_pet_request } from '../redux/actions';
import { connect } from 'react-redux';
import ls from 'local-storage';

const updatePetProfile = (dispatch, form) => {
    let token = ls.get("token") || "";
    if (token !== "") {
        dispatch(update_pet_request(form, token));
    }
}

const addPetProfile = (dispatch, form) => {
    let token = ls.get("token") || "";
    if (token !== "") {
        dispatch(add_pet_request(form, token));
    }
}

const mapStateToProps = state => {
    return {
        auth : state.auth,
        pet_profiles : state.pet_profiles
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updatePetProfile: (form) => updatePetProfile(dispatch, form),
        addPetProfile: (form) => addPetProfile(dispatch, form),
        openSnackbar: (message, variant, horizontal, vertical) => dispatch(open_snackbar(message, variant, horizontal, vertical)),
    }
};

const PetProfileContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PetProfile);

export default PetProfileContainer