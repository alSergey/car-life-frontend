import { api } from "../../../api";
import { ComplainForm } from "../../../components/CreateComplainForm/api";

export const complainEvent = (
	eventId: number,
	form: ComplainForm
): Promise<number> =>
	api.events
		.complainCreate(eventId, {
			text: form.text,
		})
		.then(({ status }) => status);
