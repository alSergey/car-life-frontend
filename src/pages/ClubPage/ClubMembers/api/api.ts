import { api } from "../../../../api";
import { ModelsUserCard } from "../../../../api/Api";

export const getClubMembersList = (clubId: number): Promise<ModelsUserCard[]> =>
	api.clubs.participantsDetail(clubId).then(({ data }) => data);

export const getClubMembersRequestList = (
	clubId: number
): Promise<ModelsUserCard[]> =>
	api.clubs.participantsRequestsDetail(clubId).then(({ data }) => data);

export const memberApproveReject = (
	cid: number,
	uid: number,
	type: "approve" | "reject"
): Promise<number> =>
	api.clubs.participateCreate(cid, uid, type).then(({ status }) => status);
