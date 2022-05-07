import { ClubData } from "./api.types";

export const emptyClubData: ClubData = {
	id: 0,
	name: "",
	description: "",
	tags: [],
	avatar: "",
	userStatus: "",
	owner: {
		id: 0,
		name: "",
		surname: "",
		avatar: "",
	},
	counters: {
		members: 0,
		subscribers: 0,
	},
};
