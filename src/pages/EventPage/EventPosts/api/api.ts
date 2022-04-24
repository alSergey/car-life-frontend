import { api } from "../../../../api";
import { ModelsUserCard } from "../../../../api/Api";

export const getEventPosts = (eventId: number): Promise<ModelsUserCard[]> =>
	api.events.eventsDetail2(eventId, "participant").then(({ data }) => data);
