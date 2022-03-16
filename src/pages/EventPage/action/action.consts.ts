import { EventData } from "./action.types";

export const emptyEventData: EventData = {
	id: 0,
	name: "",
	club: 1,
	description: "",
	event_date: "",
	location: {
		latitude: 0,
		longitude: 0,
	},
	avatar: "",
};
