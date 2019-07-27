import { SERVER } from '../util/config';
import axios from "axios";


export const set_schedule = (form, token) => {
    return axios.post(SERVER + "api/robot/schedule", {
        "pet": form.name,
        "time": form.time,
        "weight": form.weight,
        "repeat": form.repeat,
        "container": form.container,
        "bowl": form.bowl,
    }, { 
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        auth: { username : token, password : "" }
    })
}