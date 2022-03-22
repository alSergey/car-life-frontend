import { api } from "../../../api";
import { ModelsEvent } from "../../../api/Api";

export const getEventList = (query: string): Promise<ModelsEvent[]> => {
	return api.events
		.eventsList({
			Query: query || undefined,
		})
		.then(({ data }) => data);
};
