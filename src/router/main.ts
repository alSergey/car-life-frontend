import { Page } from "@happysanta/router";
import {
	eventIdQuery,
	clubIdQuery,
	userIdQuery,
	carIdQuery,
} from "./pagesQuery";

// url
export const MAIN_PAGE = "/main";
export const MAIN_CREATE_EVENT_PAGE = "/main/event/create";
export const MAIN_CREATE_CLUB_PAGE = "/main/club/create";
export const MAIN_EVENT_PAGE = `/main/event/${eventIdQuery}`;
export const MAIN_CLUB_PAGE = `/main/club/${clubIdQuery}`;
export const MAIN_USER_PAGE = `/main/user/${userIdQuery}`;
export const MAIN_CAR_PAGE = `/main/car/${carIdQuery}`;

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
