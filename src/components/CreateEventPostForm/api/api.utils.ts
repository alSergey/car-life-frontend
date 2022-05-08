import { EventPostForm } from "./api.types";

export const isEventPostFormFilled = (form: EventPostForm): boolean =>
	[form.text, form.files].every(Boolean);
