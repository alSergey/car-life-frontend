import { ClubData } from "./api.types";
import { api } from "../../../api";

export const getClub = (id: number): Promise<ClubData> =>
	api.clubs.clubsDetail(id).then(({ data }) => ({
		id: data.id,
		name: data.name,
		description: data.description,
		tags: data.tags,
		avatar: data.avatar,
		userStatus: data.user_status,
		owner: {
			id: data.owner.vkid,
			name: data.owner.name,
			surname: data.owner.surname,
			avatar: data.owner.avatar_url,
		},
		counters: {
			members: data.participants_count,
			subscribers: data.subscribers_count,
		},
	}));
