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

	return api.miniEvent
		.createCreate({
			description: form.description,
			type_id: form.type_id,
			ended_at: new Date(`2022-04-06T${form.ended_at}Z`).toISOString(),
			latitude: form.latitude,
			longitude: form.longitude,
		})
		.then(({ data }) => data.id);
};
