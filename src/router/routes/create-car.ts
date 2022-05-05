import { Router } from "@happysanta/router";

const CREATE_CAR_PAGE = "car/create";

export const getCreateCarPage = (prefix: string): string =>
	`${prefix}/${CREATE_CAR_PAGE}`;

export const redirectCreateCarPage = (router: Router, prefix: string): void => {
	router.pushPage(getCreateCarPage(prefix));
};
