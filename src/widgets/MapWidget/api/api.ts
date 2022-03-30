import { ModelsEvent, ModelsEventCard } from "../../../api/Api";
import { api } from "../../../api";

export const getEventList = (): Promise<ModelsEventCard[]> => {
	return api.events.eventsList().then(({ data }) => data);
};
