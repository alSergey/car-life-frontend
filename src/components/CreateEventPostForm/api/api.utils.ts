import { EventPostForm } from "./api.types";

export const isEventPostFormFilled = (form: EventPostForm): boolean =>
	[form.text].every(Boolean);
