import { Page } from "@happysanta/router";
import {
	getCreateEventPage,
	getCreateCarPage,
	getCarPage,
	getClubPage,
	getEventPage,
	getUserPage,
} from "./routes";

// page url prefix
export const PROFILE_PAGE_PREFIX = "/profile";

// url
export const PROFILE_PAGE = `/profile`;
const PROFILE_CREATE_EVENT_PAGE = getCreateEventPage(PROFILE_PAGE_PREFIX);
const PROFILE_CREATE_CAR_PAGE = getCreateCarPage(PROFILE_PAGE_PREFIX);
const PROFILE_EVENT_PAGE = getEventPage(PROFILE_PAGE_PREFIX);
const PROFILE_CLUB_PAGE = getClubPage(PROFILE_PAGE_PREFIX);
const PROFILE_USER_PAGE = getUserPage(PROFILE_PAGE_PREFIX);
const PROFILE_CAR_PAGE = getCarPage(PROFILE_PAGE_PREFIX);

// panel
export const PROFILE_PANEL = "profile_page";
export const PROFILE_CREATE_EVENT_PANEL = "profile_create_event_panel";
export const PROFILE_CREATE_CAR_PANEL = "profile_create_car_panel";
export const PROFILE_EVENT_PANEL = "profile_event_panel";
export const PROFILE_CLUB_PANEL = "profile_club_panel";
export const PROFILE_USER_PANEL = "profile_user_panel";
export const PROFILE_CAR_PANEL = "profile_car_panel";

// view
export const PROFILE_VIEW = "profile_view";

export const PROFILE_ROUTES = {
	[PROFILE_PAGE]: new Page(PROFILE_PANEL, PROFILE_VIEW),
	[PROFILE_CREATE_EVENT_PAGE]: new Page(
		PROFILE_CREATE_EVENT_PANEL,
		PROFILE_VIEW
	),
	[PROFILE_EVENT_PAGE]: new Page(PROFILE_EVENT_PANEL, PROFILE_VIEW),
	[PROFILE_CLUB_PAGE]: new Page(PROFILE_CLUB_PANEL, PROFILE_VIEW),
	[PROFILE_USER_PAGE]: new Page(PROFILE_USER_PANEL, PROFILE_VIEW),
	[PROFILE_CREATE_CAR_PAGE]: new Page(PROFILE_CREATE_CAR_PANEL, PROFILE_VIEW),
	[PROFILE_CAR_PAGE]: new Page(PROFILE_CAR_PANEL, PROFILE_VIEW),
};
