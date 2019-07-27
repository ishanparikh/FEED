export const SET_LOGIN = 'SET_LOGIN';
export const ADD_PET_REQUEST = 'ADD_PET_REQUEST';
export const ADD_PET = 'ADD_PET';
export const UPDATE_PET_REQUEST = 'UPDATE_PET_REQUEST';
export const UPDATE_PET = 'UPDATE_PET';
export const ADD_FEED_SCHEDULE = 'ADD_FEED_SCHEDULE';
export const LOG_OUT = 'LOG_OUT';
export const SET_PI_ADDRESS = 'SET_PI_ADDRESS';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const FETCH_USER = 'FETCH_USER';
export const SET_USER = 'SET_USER';
export const CHECK_TOKEN = 'CHECK_TOKEN';
export const REGISTER_USER = 'REGISTER_USER';
export const SET_PETS = 'SET_PETS';
export const SET_SCHEDULE_REQUEST = 'SET_SCHEDULE_REQUEST';
export const SET_SCHEDULES = 'SET_SCHEDULES';

export function set_schedules(schedules) {
  return { type: SET_SCHEDULES, payload: schedules };
}

export function set_pets(pets) {
  return { type: SET_PETS, payload: pets };
}

export function register_user(form) {
  return { type: REGISTER_USER, payload: form };
}

export function check_token(token) {
  return { type: CHECK_TOKEN, payload: token };
}

export function set_user(user) {
  return { type: SET_USER, payload: user };
}

export function fetch_user(form) {
  return { type: FETCH_USER, payload: form };
}

export function set_login(token){
    return { type: SET_LOGIN, payload: token };
}

export function log_out() {
  return { type: LOG_OUT }
}

export function add_pet_request(form, token) {
  return { type: ADD_PET_REQUEST, payload: { form: form, token: token } };
}

export function add_pet(form) {
  return { type: ADD_PET, payload: form };
}

export function update_pet_request(form, token) {
  return { type: UPDATE_PET_REQUEST, payload: { form: form, token: token } };
}

export function update_pet(form) {
  return { type: UPDATE_PET, payload: form };
}

export function add_feed_schedule(schedule) {
  return { type: ADD_FEED_SCHEDULE, payload: schedule };
}

export function set_schedule_request(form, token) {
  return { type: SET_SCHEDULE_REQUEST, payload: { form: form, token: token } }; 
}

export function set_pi_address(address) {
  return { type: SET_PI_ADDRESS, payload: address };
}

export function open_snackbar(message, variant, horizontal, vertical) {  
  return { 
    type: OPEN_SNACKBAR,
    payload: { 
      'message': message,
      'variant': variant,
      'horizontal': horizontal,
      'vertical': vertical,
    } 
  };
}

export function close_snackbar() {
  return { type: CLOSE_SNACKBAR }
}
