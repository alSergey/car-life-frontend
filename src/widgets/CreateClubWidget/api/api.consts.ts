import { ClubTags, CreateClubForm } from "./api.types";

export const emptyClubTags: ClubTags[] = [];

export const emptyCreateClubForm: CreateClubForm = {
	name: "",
	description: "",
	tags: [],
	file: null,
};
