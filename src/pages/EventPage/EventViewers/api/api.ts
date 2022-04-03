import { api } from "../../../../api";
import { ModelsUserCard } from "../../../../api/Api";

export const getEventViewersList = (
	eventId: number
): Promise<ModelsUserCard[]> =>
	api.events.eventsDetail2(eventId, "spectator").then(({ data }) => data);
