import { api } from "../../../../api";
import { ModelsUserCard } from "../../../../api/Api";

export const getEventMembersList = (
	eventId: number
): Promise<ModelsUserCard[]> =>
	api.events.participantsDetail(eventId).then(({ data }) => data);

export const getEventMembersRequestList = (
	eventId: number
): Promise<ModelsUserCard[]> =>
	api.events.participantsRequestsDetail(eventId).then(({ data }) => data);

export const memberEventApproveReject = (
	eid: number,
	uid: number,
	type: "approve" | "reject"
): Promise<number> =>
	api.events.participateCreate(eid, uid, type).then(({ status }) => status);
