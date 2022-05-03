import { api } from "../../../api";
import {
	EventForm,
	isEventFormFilled,
} from "../../../components/CreateEventForm";
import { convertDateTimeToUTC } from "../../../constants/time";

export const createNewEvent = (form: EventForm): Promise<number> => {
	if (!isEventFormFilled(form) || !form.club || !form.location)
		throw new Error("Не заполнены все поля");

	return api.event
		.createCreate({
			name: form.name,
			club_id: form.club.value,
			description: form.description,
			event_date: convertDateTimeToUTC(form.date, form.time),
			latitude: form.location.latitude,
			longitude: form.location.longitude,
			avatar: "",
		})
		.then(({ data }) => {
			if (!form.file) return data.id;

			return api.events
				.uploadCreate(data.id, {
					"file-upload": form.file,
				})
				.then(() => data.id);
		});
};
