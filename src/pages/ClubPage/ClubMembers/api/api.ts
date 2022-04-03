import { api } from "../../../../api";
import { ModelsUserCard } from "../../../../api/Api";

export const getClubMembersList = (clubId: number): Promise<ModelsUserCard[]> =>
	api.clubs.clubsDetail2(clubId, "participant").then(({ data }) => data);

export const getClubMembersRequestList = (
	clubId: number
): Promise<ModelsUserCard[]> =>
	api.clubs
		.clubsDetail2(clubId, "participant_request")
		.then(({ data }) => data);

export const memberClubApproveReject = (
	cid: number,
	uid: number,
	type: "approve" | "reject"
): Promise<number> =>
	api.clubs.participateCreate(cid, uid, type).then(({ status }) => status);
