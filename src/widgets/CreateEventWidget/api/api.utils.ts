import { CreateEventForm } from "./api.types";

export const isCreateEventFormFilled = (form: CreateEventForm): boolean =>
	[form.name, form.description, form.date, form.time, form.file].every(Boolean);
