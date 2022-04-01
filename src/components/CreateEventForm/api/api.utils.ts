import { EventForm } from "./api.types";

export const isEventFormFilled = (form: EventForm): boolean =>
	[
		form.name,
		form.description,
		form.date,
		form.time,
		form.file,
		form.location,
	].every(Boolean);
