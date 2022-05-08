import { ComplainForm } from "./api.types";

export const isComplainFormFilled = (form: ComplainForm): boolean =>
	[form.text].every(Boolean);
