import { api } from "../../../../api";
import { ModelsEventCard } from "../../../../api/Api";

export const getAdminEventList = (userId: number): Promise<ModelsEventCard[]> =>
	api.user.eventsDetail(userId, "admin").then(({ data }) => data);

export const getMemberEventList = (
	userId: number
): Promise<ModelsEventCard[]> =>
	api.user.eventsDetail(userId, "participant").then(({ data }) => data);

export const getViewerEventList = (
	userId: number
): Promise<ModelsEventCard[]> =>
	api.user.eventsDetail(userId, "spectator").then(({ data }) => data);
