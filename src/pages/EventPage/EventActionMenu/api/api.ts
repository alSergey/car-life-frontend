import { api } from "../../../../api";

export const deleteEvent = (eventId: number): Promise<number> =>
	api.events.deleteCreate(eventId).then(({ status }) => status);

export const complainEvent = (eventId: number): Promise<number> =>
	api.events.complainCreate(eventId, {}).then(({ status }) => status);
