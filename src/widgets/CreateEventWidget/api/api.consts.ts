import { CreateEventForm } from "./api.types";

export const emptyCreateEventForm: CreateEventForm = {
	name: "",
	description: "",
	date: "",
	time: "",
	file: null,
	location: {
		description: "Москва",
		longitude: 0,
		latitude: 0,
	},
};
