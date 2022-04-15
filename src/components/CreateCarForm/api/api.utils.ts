import { CarForm } from "./api.types";

export const isCarFormFilled = (form: CarForm): boolean => {
	if (+form.date < 1000 || +form.date > 2200) {
		return false;
	}
	return [form.brand, form.model, form.date, form.file].every(Boolean);
};
