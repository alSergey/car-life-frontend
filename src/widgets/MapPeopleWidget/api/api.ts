import {
	ModelsCreateMiniEventRequest,
	ModelsMiniEvent,
} from "../../../api/Api";
import { api } from "../../../api";
import { isMiniEventFormFilled } from "./api.utils";

export const getMiniEventList = (): Promise<ModelsMiniEvent[]> => {
	return api.miniEvents.miniEventsList().then(({ data }) => data);
};

export const createNewMiniEvent = (
	form: ModelsCreateMiniEventRequest
): Promise<number | undefined> => {
	if (!isMiniEventFormFilled(form) || !form.type_id)
		throw new Error("Не заполнены все поля");

	const time = form.ended_at.split(":");
	const endedAt = new Date();
	endedAt.setHours(+time[0], +time[1]);
	if (endedAt.getTime() < new Date().getTime()) {
		endedAt.setDate(endedAt.getDate() + 1);
	}
	return api.miniEvent
		.createCreate({
			description: form.description,
			type_id: form.type_id,
			ended_at: endedAt.toISOString(),
			latitude: form.latitude,
			longitude: form.longitude,
		})
		.then(({ data }) => data.id);
};
