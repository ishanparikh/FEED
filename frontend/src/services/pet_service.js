import { SERVER } from '../util/config';
import axios from "axios";


export const add_pet_request = (form, token) => {
    return axios.post(SERVER + "api/user/pet", {
        "name": form.name,
        "weight": form.weight,
        "breed": form.breed,
        "gender": form.gender,
        "date_of_birth": form.date_of_birth,
    }, { 
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        auth: { username : token, password : "" }
    })
}

export const update_pet_request = (form, token) => {
    return axios.patch(SERVER + "api/user/pet", {
        "id": form.id,
        "name": form.name,
        "weight": form.weight,
        "breed": form.breed,
        "gender": form.gender,
        "date_of_birth": form.date_of_birth,
    }, { 
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        auth: { username : token, password : "" }
    })
}