import { EventForm } from "./api.types";

export const emptyEventForm: EventForm = {
	name: "",
	description: "",
	club: null,
	date: "",
	time: "",
	file: null,
	location: {
		longitude: 37.573856,
		latitude: 55.751574,
	},
};
