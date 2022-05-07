import { EventData } from "./api.types";

export const emptyEventData: EventData = {
	id: 0,
	name: "",
	userStatus: "",
	creator: {
		id: 0,
		name: "",
		surname: "",
		avatar: "",
	},
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
	counters: {
		members: 0,
		viewers: 0,
	},
};
