import { FavForm } from "./api.types";

export const isFavFormFilled = (form: FavForm): boolean =>
	[form.tags.length !== 0, form.description].every(Boolean);
