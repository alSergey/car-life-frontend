import { ModelsEvent } from "../../../api/Api";
import { api } from "../../../api";

export const getEventList = (): Promise<ModelsEvent[]> => {
	return api.events.eventsList().then(({ data }) => data);
};
