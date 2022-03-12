import {EventForm} from "./action.types";
import {isEventFormFilled} from "./action.utils";

export const sendEvent = (form: EventForm) => {
    if (!isEventFormFilled(form)) throw new Error('Не заполнены все поля')

    throw new Error('asdas')
}