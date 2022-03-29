import { RegForm } from "./api.types";

export const isRegFormFilled = (form: RegForm): boolean =>
	[form.tags.length !== 0, form.car].every(Boolean);
