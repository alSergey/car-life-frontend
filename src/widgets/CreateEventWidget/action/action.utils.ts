import {EventForm} from "./action.types";

export const isEventFormFilled = (form: EventForm): boolean => {
    return [
        form.name,
        form.description,
        form.date,
        form.time,
        form.location.description,
    ].every(Boolean)
}