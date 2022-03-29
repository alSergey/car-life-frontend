import { CarForm } from "./api.types";

export const isCarFormFilled = (form: CarForm): boolean =>
	[form.brand, form.model, form.date, form.description, form.file].every(
		Boolean
	);
