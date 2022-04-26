import { ModelsEventCard } from "../../../api/Api";
import { api } from "../../../api";

export const getEventList = (
	coordinates?: number[][]
): Promise<ModelsEventCard[]> => {
	return api.events
		.eventsList({
			DownLeftLatitude: coordinates?.[0][0],
			DownLeftLongitude: coordinates?.[0][1],
			UpperRightLatitude: coordinates?.[1][0],
			UpperRightLongitude: coordinates?.[1][1],
		})
		.then(({ data }) => data);
};
