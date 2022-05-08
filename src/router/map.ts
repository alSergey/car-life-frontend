import { Page } from "@happysanta/router";
import { eventQuery, clubQuery, userQuery, carQuery } from "./pages";

// url
export const MAP_PAGE = "/";
export const MAP_CREATE_EVENT_PAGE = "/map/event/create";
export const MAP_CLUB_PAGE = `/map/club/${clubQuery}`;
export const MAP_EVENT_PAGE = `/map/event/${eventQuery}`;
export const MAP_USER_PAGE = `/map/user/${userQuery}`;
export const MAP_CAR_PAGE = `/map/car/${carQuery}`;

// panel
export const MAP_PANEL = "map_panel";
export const MAP_CREATE_EVENT_PANEL = "map_create_event_panel";
export const MAP_CLUB_PANEL = "map_club_panel";
export const MAP_EVENT_PANEL = "map_event_panel";
export const MAP_USER_PANEL = "map_user_panel";
export const MAP_CAR_PANEL = "map_car_panel";

// view
export const MAP_VIEW = "map_view";

export const MAP_ROUTES = {
	[MAP_PAGE]: new Page(MAP_PANEL, MAP_VIEW),
	[MAP_CREATE_EVENT_PAGE]: new Page(MAP_CREATE_EVENT_PANEL, MAP_VIEW),
	[MAP_CLUB_PAGE]: new Page(MAP_CLUB_PANEL, MAP_VIEW),
	[MAP_EVENT_PAGE]: new Page(MAP_EVENT_PANEL, MAP_VIEW),
	[MAP_USER_PAGE]: new Page(MAP_USER_PANEL, MAP_VIEW),
	[MAP_CAR_PAGE]: new Page(MAP_CAR_PANEL, MAP_VIEW),
};
