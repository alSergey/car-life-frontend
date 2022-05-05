import { Page } from "@happysanta/router";
import {
	getCreateEventPage,
	getCreateClubPage,
	getCarPage,
	getClubPage,
	getEventPage,
	getUserPage,
} from "./routes";

// page url prefix
export const MAIN_PAGE_PREFIX = "/main";

// url
export const MAIN_PAGE = `/main`;
const MAIN_CREATE_EVENT_PAGE = getCreateEventPage(MAIN_PAGE_PREFIX);
const MAIN_CREATE_CLUB_PAGE = getCreateClubPage(MAIN_PAGE_PREFIX);
const MAIN_EVENT_PAGE = getEventPage(MAIN_PAGE_PREFIX);
const MAIN_CLUB_PAGE = getClubPage(MAIN_PAGE_PREFIX);
const MAIN_USER_PAGE = getUserPage(MAIN_PAGE_PREFIX);
const MAIN_CAR_PAGE = getCarPage(MAIN_PAGE_PREFIX);

// panel
export const MAIN_PANEL = "main_page";
export const MAIN_CREATE_EVENT_PANEL = "main_create_event_panel";
export const MAIN_CREATE_CLUB_PANEL = "main_create_club_panel";
export const MAIN_EVENT_PANEL = "main_event_panel";
export const MAIN_CLUB_PANEL = "main_club_panel";
export const MAIN_USER_PANEL = "main_user_panel";
export const MAIN_CAR_PANEL = "main_car_panel";

// view
export const MAIN_VIEW = "main_view";

export const MAIN_ROUTES = {
	[MAIN_PAGE]: new Page(MAIN_PANEL, MAIN_VIEW),
	[MAIN_CREATE_EVENT_PAGE]: new Page(MAIN_CREATE_EVENT_PANEL, MAIN_VIEW),
	[MAIN_CREATE_CLUB_PAGE]: new Page(MAIN_CREATE_CLUB_PANEL, MAIN_VIEW),
	[MAIN_EVENT_PAGE]: new Page(MAIN_EVENT_PANEL, MAIN_VIEW),
	[MAIN_CLUB_PAGE]: new Page(MAIN_CLUB_PANEL, MAIN_VIEW),
	[MAIN_USER_PAGE]: new Page(MAIN_USER_PANEL, MAIN_VIEW),
	[MAIN_CAR_PAGE]: new Page(MAIN_CAR_PANEL, MAIN_VIEW),
};
