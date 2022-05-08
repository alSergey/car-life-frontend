import { api } from "../../../../api";

export const deleteEvent = (eventId: number): Promise<number> =>
	api.events.deleteCreate(eventId).then(({ status }) => status);
