import { ClubForm } from "./api.types";

export const isClubFormFilled = (form: ClubForm): boolean =>
	[form.name, form.description, form.tags, form.file].every(Boolean);
