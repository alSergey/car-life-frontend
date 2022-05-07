import { api } from "../../../../api";

export const deleteClub = (clubId: number): Promise<number> =>
	api.clubs.deleteCreate(clubId).then(({ status }) => status);

export const complainClub = (clubId: number): Promise<number> =>
	api.clubs.complainCreate(clubId, {}).then(({ status }) => status);
