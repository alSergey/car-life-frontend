import { api } from "../../../../api";
import { ModelsClubCard } from "../../../../api/Api";

export const getClubList = (query: string): Promise<ModelsClubCard[]> =>
	api.clubs
		.clubsList({
			Query: query || undefined,
		})
		.then(({ data }) => data);
