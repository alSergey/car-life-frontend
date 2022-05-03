import { api } from "../../../../../api";

export const getEventChatLink = (id: number): Promise<string> =>
	api.events.chatLinkDetail(id).then(({ data }) => data.chat_link);

export const newEventMember = (id: number): Promise<number> =>
	api.events.eventsCreate(id, "participate").then(({ status }) => status);

export const newEventViewer = (id: number): Promise<number> =>
	api.events.eventsCreate(id, "spectate").then(({ status }) => status);

export const leaveEvent = (id: number): Promise<number> =>
	api.events.leaveCreate(id).then(({ status }) => status);
