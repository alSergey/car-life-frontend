import { ModelsCreateMiniEventRequest } from "../../../../api/Api";

export const emptyMiniEventForm: ModelsCreateMiniEventRequest = {
	description: "",
	ended_at: "",
	latitude: 0,
	longitude: 0,
	type_id: 0,
};
