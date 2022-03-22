import { api } from "../../../api";
import { ModelsClub } from "../../../api/Api";

export const getClubList = (query: string): Promise<ModelsClub[]> =>
	api.clubs
		.clubsList({
			Query: query || undefined,
		})
		.then(({ data }) => data);
