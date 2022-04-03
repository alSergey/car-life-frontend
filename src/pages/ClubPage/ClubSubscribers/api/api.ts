import { api } from "../../../../api";
import { ModelsUserCard } from "../../../../api/Api";

export const getClubSubscribersList = (
	clubId: number
): Promise<ModelsUserCard[]> =>
	api.clubs.clubsDetail2(clubId, "subscriber").then(({ data }) => data);
