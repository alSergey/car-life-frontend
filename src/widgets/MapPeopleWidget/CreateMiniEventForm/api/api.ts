import { ModelsCreateMiniEventRequest } from "../../../../api/Api";
import { isMiniEventFormFilled } from "./api.utils";
import { api } from "../../../../api";
import { convertMiniEventTimeToUTC } from "../../../../constants/time";

export const createNewMiniEvent = (
	form: ModelsCreateMiniEventRequest
): Promise<number | undefined> => {
	if (!isMiniEventFormFilled(form) || !form.type_id)
		throw new Error("Не заполнены все поля");

	return api.miniEvent
		.createCreate({
			description: form.description,
			type_id: form.type_id,
			ended_at: convertMiniEventTimeToUTC(form.ended_at),
			latitude: form.latitude,
			longitude: form.longitude,
		})
		.then(({ data }) => data.id);
};
