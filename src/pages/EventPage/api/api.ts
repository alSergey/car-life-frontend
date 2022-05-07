import { EventData } from "./api.types";
import { api } from "../../../api";

export const getEvent = (id: number): Promise<EventData> => {
	return api.events.eventsDetail(id).then(({ data }) => ({
		id: data.id,
		name: data.name,
		userStatus: data.user_status,
		creator: {
			id: data.creator.vkid,
			name: data.creator.name,
			surname: data.creator.surname,
			avatar: data.creator.avatar_url,
		},
		club: {
			id: data.club.id,
			name: data.club.name,
			avatar: data.club.avatar,
		},
		event_date: data.event_date,
		description: data.description,
		location: {
			latitude: data.latitude,
			longitude: data.longitude,
		},
		avatar: data.avatar,
		counters: {
			members: data.participants_count,
			viewers: data.spectators_count,
		},
	}));
};
