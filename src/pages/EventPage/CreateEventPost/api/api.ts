import { api, getToken } from "../../../../api";
import { backBaseUrl } from "../../../../constants/url";
import { EventPostData } from "../CreateEventPost";

export const createNewEventPost = (
	form: EventPostData,
	eventId: number
): Promise<number> => {
	if (!form.text && !form.files) throw new Error("Не заполнены все поля");

	return api.eventPosts
		.createCreate(eventId, {
			text: form.text,
		})
		.then(({ data }) => {
			if (!form.files) return data.id;

			const formData = new FormData();
			form.files.forEach((f) => formData.append("file-upload", f));

			return fetch(`${backBaseUrl}/events_posts/${data.id}/upload`, {
				method: "POST",
				body: formData,
				headers: { auth: getToken() },
			}).then(() => data.id);
		});
};
