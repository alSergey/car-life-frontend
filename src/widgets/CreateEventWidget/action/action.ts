import {EventForm} from "./action.types";
import {isEventFormFilled} from "./action.utils";
import axios from "axios";

export const sendEvent = (form: EventForm) => {
    if (!isEventFormFilled(form)) throw new Error('Не заполнены все поля')
    console.log(form.date, ' ', form.time);
   return axios.post('http://localhost:8080/api/v1/event/create', {
       name: form.name,
       club: {
           id: 1,
       },
       description: form.description,
       event_date: new Date(`${form.date}T${form.time}Z`).toISOString(),
       latitude: form.location.latitude,
       longitude: form.location.longitude,
   })
}