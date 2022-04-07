import { api } from "../../../../api";
import { ModelsClubCard } from "../../../../api/Api";

export const getAdminClubList = (userId: number): Promise<ModelsClubCard[]> =>
	api.user.clubsDetail(userId, "admin").then(({ data }) => data);

export const getMemberClubList = (userId: number): Promise<ModelsClubCard[]> =>
	api.user.clubsDetail(userId, "participant").then(({ data }) => data);

export const getSubscriberClubList = (
	userId: number
): Promise<ModelsClubCard[]> =>
	api.user.clubsDetail(userId, "subscriber").then(({ data }) => data);
