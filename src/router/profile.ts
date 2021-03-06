import { Page } from "@happysanta/router";
import { eventQuery, clubQuery, userQuery, carQuery } from "./pages";

// url
export const PROFILE_PAGE = `/profile`;
export const PROFILE_CREATE_CLUB_PAGE = "/profile/club/create";
export const PROFILE_CREATE_EVENT_PAGE = "/profile/event/create";
export const PROFILE_CREATE_CAR_PAGE = "/profile/car/create";
export const PROFILE_CLUB_PAGE = `/profile/club/${clubQuery}`;
export const PROFILE_EVENT_PAGE = `/profile/event/${eventQuery}`;
export const PROFILE_USER_PAGE = `/profile/user/${userQuery}`;
export const PROFILE_CAR_PAGE = `/profile/car/${carQuery}`;

// panel
export const PROFILE_PANEL = "profile_page";
export const PROFILE_CREATE_CLUB_PANEL = "profile_create_club_panel";
export const PROFILE_CREATE_EVENT_PANEL = "profile_create_event_panel";
export const PROFILE_CREATE_CAR_PANEL = "main_create_car_panel";
export const PROFILE_CLUB_PANEL = "profile_club_panel";
export const PROFILE_EVENT_PANEL = "profile_event_panel";
export const PROFILE_USER_PANEL = "profile_user_panel";
export const PROFILE_CAR_PANEL = "profile_car_panel";

// view
export const PROFILE_VIEW = "profile_view";

export const PROFILE_ROUTES = {
	[PROFILE_PAGE]: new Page(PROFILE_PANEL, PROFILE_VIEW),
	[PROFILE_CREATE_CLUB_PAGE]: new Page(PROFILE_CREATE_CLUB_PANEL, PROFILE_VIEW),
	[PROFILE_CREATE_EVENT_PAGE]: new Page(
		PROFILE_CREATE_EVENT_PANEL,
		PROFILE_VIEW
	),
	[PROFILE_CREATE_CAR_PAGE]: new Page(PROFILE_CREATE_CAR_PANEL, PROFILE_VIEW),
	[PROFILE_CLUB_PAGE]: new Page(PROFILE_CLUB_PANEL, PROFILE_VIEW),
	[PROFILE_EVENT_PAGE]: new Page(PROFILE_EVENT_PANEL, PROFILE_VIEW),
	[PROFILE_USER_PAGE]: new Page(PROFILE_USER_PANEL, PROFILE_VIEW),
	[PROFILE_CAR_PAGE]: new Page(PROFILE_CAR_PANEL, PROFILE_VIEW),
};
