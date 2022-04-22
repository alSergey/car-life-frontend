import { api } from "../../../api";
import { backBaseUrl } from "../../../constants/url";
import {
	EventForm,
	isEventFormFilled,
} from "../../../components/CreateEventForm";

export const createNewEvent = (form: EventForm): Promise<number> => {
	if (!isEventFormFilled(form) || !form.club || !form.location)
		throw new Error("Не заполнены все поля");

	return api.event
		.createCreate({
			name: form.name,
			club_id: form.club.value,
			description: form.description,
			event_date: new Date(`${form.date}T${form.time}Z`).toISOString(),
			latitude: form.location.latitude,
			longitude: form.location.longitude,
			avatar: "",
		})
		.then(({ data }) => {
			if (!form.file) return data.id;

			const formData = new FormData();
			formData.append("file-upload", form.file);

			return fetch(`${backBaseUrl}/events/${data.id}/upload`, {
				method: "POST",
				body: formData,
			}).then(() => data.id);
		});
};
