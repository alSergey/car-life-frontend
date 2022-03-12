import {EventForm} from "./action.types";

export const emptyEventForm: EventForm = {
    name: '',
    description: '',
    date: '',
    time: '',
    location: {
        description: 'Москва',
        longitude: 0,
        latitude: 0,
    },
}