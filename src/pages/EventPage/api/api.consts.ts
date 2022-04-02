import { EventData } from "./api.types";

export const emptyEventData: EventData = {
	id: 0,
	name: "",
	userStatus: "",
	club: {
		id: 1,
		name: "",
		avatar: "",
	},
	description: "",
	event_date: "",
	location: {
		latitude: 0,
		longitude: 0,
	},
	avatar: "",
};
