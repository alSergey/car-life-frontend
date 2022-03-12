import {EventForm} from "./action.types";
import {isEventFormFilled} from "./action.utils";
import axios from "axios";

export const sendEvent = (form: EventForm) => {
    if (!isEventFormFilled(form)) throw new Error('Не заполнены все поля')

   return axios.post('http://localhost:8080/api/v1/event/create', {
       id: 1,
       name: form.name,
       club: {
           id: 1,
       },
       description: form.description,
       event_date: new Date().toISOString(),
       latitude: form.location.latitude,
       longitude: form.location.longitude,
       avatar: 'https://pbs.twimg.com/profile_images/1173161429266030592/lJCNA_JC_400x400.jpg'
   })
}