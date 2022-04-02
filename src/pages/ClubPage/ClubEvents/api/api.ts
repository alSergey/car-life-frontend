import { api } from "../../../../api";
import { ModelsEventCard } from "../../../../api/Api";

export const getClubEventList = (id: number): Promise<ModelsEventCard[]> =>
	api.clubs.eventsDetail(id).then(({ data }) => data);
