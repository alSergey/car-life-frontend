import { CreateEventForm } from "./api.types";

export const emptyCreateEventForm: CreateEventForm = {
	name: "",
	description: "",
	date: "",
	time: "",
	file: null,
	location: {
		longitude: 37.573856,
		latitude: 55.751574,
	},
};
