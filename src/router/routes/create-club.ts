import { Router } from "@happysanta/router";

const CREATE_CLUB_PAGE = "club/create";

export const getCreateClubPage = (prefix: string): string =>
	`${prefix}/${CREATE_CLUB_PAGE}`;

export const redirectCreateClubPage = (
	router: Router,
	prefix: string
): void => {
	router.pushPage(getCreateClubPage(prefix));
};
