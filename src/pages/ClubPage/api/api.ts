import { ClubData } from "./api.types";
import { api } from "../../../api";

export const getClub = (id: number): Promise<ClubData> =>
	api.clubs.clubsDetail(id).then(({ data }) => ({
		id: data.id,
		name: data.name,
		description: data.description,
		tags: data.tags,
		avatar: data.avatar,
	}));

export const newClubMember = (id: number): Promise<number> =>
	api.clubs.participateCreate2(id).then(({ status }) => status);
