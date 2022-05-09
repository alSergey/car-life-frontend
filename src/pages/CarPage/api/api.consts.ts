import { CarData } from "./api.types";

export const emptyCarData: CarData = {
	id: 0,
	brand: "",
	model: "",
	date: "",
	avatar_url: "",
	owner: {
		avatar_url: "",
		name: "",
		surname: "",
		id: -1,
	},
};
