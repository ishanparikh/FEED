import { 
    SET_LOGIN,
    UPDATE_PET,
    ADD_FEED_SCHEDULE,
    LOG_OUT,
    SET_PI_ADDRESS,
    OPEN_SNACKBAR,
    CLOSE_SNACKBAR,
    SET_USER,
    SET_PETS,
    ADD_PET,
    SET_SCHEDULES,
} from "./actions";
import { combineReducers } from 'redux';

function auth(state = {}, action){
    switch(action.type){
        case SET_LOGIN:
            return {
                ...state,
                token: action.payload,
            }
        case SET_USER:
            return action.payload
        case LOG_OUT:
            return {
                ...state,
                token: ""
            }
        case SET_PI_ADDRESS:
            return {
                ...state,
                pi_address: action.payload
            }
        default:
            return state;
    }
}

function pet_profiles(state = {}, action){
    switch(action.type){
        case UPDATE_PET:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case ADD_PET:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        case SET_PETS:
            return action.payload;
      default:
          return state;
    }
}

function snackbar(state = {}, action) {
    switch(action.type){
        case OPEN_SNACKBAR:
            return {
                open: true,
                message: action.payload.message,
                variant: action.payload.variant,
                horizontal: action.payload.horizontal,
                vertical: action.payload.vertical,
            }
        case CLOSE_SNACKBAR:
            return {
                ...state,
                open: false,
                message: '',
            }
      default:
          return state;
    }
}

function schedules(state = {}, action) {
    switch(action.type) {
        case ADD_FEED_SCHEDULE:
            if (state[action.payload.pet] === undefined) {
                return {
                    ...state,
                    [action.payload.pet]: {
                        [action.payload.id]: action.payload
                    }
                }
            } else {
                return {
                    ...state,
                    [action.payload.pet]: {
                        ...state[action.payload.pet],
                        [action.payload.id]: action.payload
                    }
                }  
            }
        case SET_SCHEDULES:
            return action.payload;
        default:
            return state;
    }
} 

const feed_reducers = combineReducers({
    auth,
    pet_profiles,
    schedules,
    snackbar
})

export default feed_reducers;
