import { Page } from "@happysanta/router";

// url
export const REG_WELCOME_PAGE = "/reg/welcome";
export const REG_FIRST_STORY_PAGE = "/reg/story/first";
export const REG_SECOND_STORY_PAGE = "/reg/story/second";
export const REG_THIRD_STORY_PAGE = "/reg/story/third";
export const REG_ABOUT_PAGE = "/reg/about";
export const REG_CAR_PAGE = "/reg/car";
export const REG_PAGE = "/reg";

// panel
export const REG_WELCOME_PANEL = "reg_welcome";
export const REG_FIRST_STORY_PANEL = "reg_first_story_panel";
export const REG_SECOND_STORY_PANEL = "reg_second_story_panel";
export const REG_THIRD_STORY_PANEL = "reg_third_story_panel";
export const REG_ABOUT_PANEL = "reg_about_panel";
export const REG_CAR_PANEL = "reg_car_panel";
export const REG_PANEL = "reg_panel";

// view
export const REG_VIEW = "reg_view";

export const REG_ROUTES = {
	[REG_WELCOME_PAGE]: new Page(REG_WELCOME_PANEL, REG_VIEW),
	[REG_FIRST_STORY_PAGE]: new Page(REG_FIRST_STORY_PANEL, REG_VIEW),
	[REG_SECOND_STORY_PAGE]: new Page(REG_SECOND_STORY_PANEL, REG_VIEW),
	[REG_THIRD_STORY_PAGE]: new Page(REG_THIRD_STORY_PANEL, REG_VIEW),
	[REG_ABOUT_PAGE]: new Page(REG_ABOUT_PANEL, REG_VIEW),
	[REG_CAR_PAGE]: new Page(REG_CAR_PANEL, REG_VIEW),
	[REG_PAGE]: new Page(REG_PANEL, REG_VIEW),
};
