import { PageParams, useParams } from "@happysanta/router";

export interface MainPageQuery {
	tab: "event" | "club";
}

export const mainQuery = ":tab(event|club)";

export const setMainPageQuery = (tab?: MainPageQuery["tab"]): PageParams => ({
	tab: tab || "event",
});

export const getMainPageQuery = (): MainPageQuery => {
	const { tab } = useParams();

	return {
		tab: tab as MainPageQuery["tab"],
	};
};
