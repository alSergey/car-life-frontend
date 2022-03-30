import { api } from "../../../api";
import { ModelsEventCard } from "../../../api/Api";

export const getEventList = (query: string): Promise<ModelsEventCard[]> => {
	return api.events
		.eventsList({
			Query: query || undefined,
		})
		.then(({ data }) => data);
};
