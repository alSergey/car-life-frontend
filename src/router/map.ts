import { Page } from "@happysanta/router";
import {
	getClubPage,
	getCreateEventPage,
	getCarPage,
	getEventPage,
	getUserPage,
} from "./routes";

// page url prefix
export const MAP_PAGE_PREFIX = "/map";

// url
export const MAP_PAGE = `/`;
const MAP_CREATE_EVENT_PAGE = getCreateEventPage(MAP_PAGE_PREFIX);
const MAP_EVENT_PAGE = getEventPage(MAP_PAGE_PREFIX);
const MAP_CLUB_PAGE = getClubPage(MAP_PAGE_PREFIX);
const MAP_USER_PAGE = getUserPage(MAP_PAGE_PREFIX);
const MAP_CAR_PAGE = getCarPage(MAP_PAGE_PREFIX);

// panel
export const MAP_PANEL = "map_panel";
export const MAP_CREATE_EVENT_PANEL = "create_event_panel";
export const MAP_EVENT_PANEL = "event_panel";
export const MAP_CLUB_PANEL = "club_panel";
export const MAP_USER_PANEL = "user_panel";
export const MAP_CAR_PANEL = "car_panel";

// view
export const MAP_VIEW = "map_view";

export const MAP_ROUTES = {
	[MAP_PAGE]: new Page(MAP_PANEL, MAP_VIEW),
	[MAP_CREATE_EVENT_PAGE]: new Page(MAP_CREATE_EVENT_PANEL, MAP_VIEW),
	[MAP_EVENT_PAGE]: new Page(MAP_EVENT_PANEL, MAP_VIEW),
	[MAP_CLUB_PAGE]: new Page(MAP_CLUB_PANEL, MAP_VIEW),
	[MAP_USER_PAGE]: new Page(MAP_USER_PANEL, MAP_VIEW),
	[MAP_CAR_PAGE]: new Page(MAP_CAR_PANEL, MAP_VIEW),
};
