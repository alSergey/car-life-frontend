import { Router } from "@happysanta/router";

const CREATE_EVENT_PAGE = "event/create";

export const getCreateEventPage = (prefix: string): string =>
	`${prefix}/${CREATE_EVENT_PAGE}`;

export const redirectCreateEventPage = (
	router: Router,
	prefix: string
): void => {
	router.pushPage(getCreateEventPage(prefix));
};
