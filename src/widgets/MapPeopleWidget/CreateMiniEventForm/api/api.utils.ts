import { ModelsCreateMiniEventRequest } from "../../../../api/Api";

export const isMiniEventFormFilled = (
	form: ModelsCreateMiniEventRequest
): boolean => [form.ended_at, form.description, form.type_id].every(Boolean);
