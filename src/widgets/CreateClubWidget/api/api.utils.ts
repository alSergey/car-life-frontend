import { CreateClubForm } from "./api.types";

export const isCreateClubFormFilled = (form: CreateClubForm): boolean =>
	[form.name, form.description, form.tags, form.file].every(Boolean);
