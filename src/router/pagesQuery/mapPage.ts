import { PageParams, useParams } from "@happysanta/router";

export interface MapPageQuery {
	tab: "event" | "people";
}

export const mapQuery = ":tab(event|people)";

export const setMapPageQuery = (tab?: MapPageQuery["tab"]): PageParams => ({
	tab: tab || "event",
});

export const getMapPageQuery = (): MapPageQuery => {
	const { tab } = useParams();

	return {
		tab: tab as MapPageQuery["tab"],
	};
};
