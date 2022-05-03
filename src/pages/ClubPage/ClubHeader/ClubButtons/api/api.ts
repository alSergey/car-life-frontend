import { api } from "../../../../../api";

export const getClubChatLink = (id: number): Promise<string> =>
	api.clubs.chatLinkDetail(id).then(({ data }) => data.chat_link);

export const newClubMember = (id: number): Promise<number> =>
	api.clubs.clubsCreate(id, "participate").then(({ status }) => status);

export const newClubSubscriber = (id: number): Promise<number> =>
	api.clubs.clubsCreate(id, "subscribe").then(({ status }) => status);

export const leaveClub = (id: number): Promise<number> =>
	api.clubs.leaveCreate(id).then(({ status }) => status);
