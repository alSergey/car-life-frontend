import { ClubData } from "./api.types";
import { api } from "../../../api";

export const getClub = (id: number): Promise<ClubData> => {
	return api.clubs.clubsDetail(id).then(({ data }) => ({
		id: data.id,
		name: data.name,
		description: data.description,
		tags: data.tags,
		avatar: data.avatar,
	}));
};
