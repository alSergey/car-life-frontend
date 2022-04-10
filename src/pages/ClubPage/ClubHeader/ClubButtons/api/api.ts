import { api } from "../../../../../api";

export const newClubMember = (id: number): Promise<number> =>
	api.clubs.clubsCreate(id, "participate").then(({ status }) => status);

export const newClubSubscriber = (id: number): Promise<number> =>
	api.clubs.clubsCreate(id, "subscribe").then(({ status }) => status);

export const getClubChatLink = (id: number): Promise<string> =>
	api.clubs.chatLinkDetail(id).then(({ data }) => data.chat_link);
