import { CreateEventForm } from "./api.types";
import { isCreateEventFormFilled } from "./api.utils";
import { api } from "../../../api";
import { backBaseUrl } from "../../../constants/url";

export const createNewEvent = (
	form: CreateEventForm
): Promise<number | undefined> => {
	if (!isCreateEventFormFilled(form)) throw new Error("Не заполнены все поля");

	return api.event
		.createCreate({
			name: form.name,
			club_id: 1,
			description: form.description,
			event_date: new Date(`${form.date}T${form.time}Z`).toISOString(),
			latitude: form.location.latitude,
			longitude: form.location.longitude,
			avatar: "",
		})
		.then(({ data }) => {
			if (!form.file) return;

			const formData = new FormData();
			formData.append("file-upload", form.file);

			return fetch(`${backBaseUrl}/events/${data.id}/upload`, {
				method: "POST",
				body: formData,
			}).then(() => data.id);
		});
};
