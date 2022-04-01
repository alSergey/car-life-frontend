import { UserAboutForm } from "./api.types";

export const isUserAboutFormFilled = (form: UserAboutForm): boolean =>
	[form.tags.length !== 0, form.description].every(Boolean);
