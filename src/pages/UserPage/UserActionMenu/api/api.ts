import { api } from "../../../../api";

export const complainUser = (userId: number): Promise<number> =>
	api.user.complainCreate(userId, {}).then(({ status }) => status);
