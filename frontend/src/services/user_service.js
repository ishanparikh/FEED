import { SERVER } from '../util/config';
import axios from "axios";

export const get_user = (form) => {
    return axios.get(SERVER + "api/user/token", {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        auth: {
            username : form.email_input,
            password : form.password_input,
        }
    })
}

export const check_token = (token) => {
    return axios.get(SERVER + "api/user/whoami", 
    {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        auth: {
            username : token,
            password : "",
        }
    })
}

export const register = (form) => {
    return axios.post(SERVER + "api/user/register", {
        "first_name": form.first_name,
        "surname": form.last_name,
        "email" : form.email_input,
        "password" : form.password_input,
    })
}
