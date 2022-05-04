import { PageParams, useParams } from "@happysanta/router";

export interface EventPageQuery {
	eventId: number;
	tab: "info" | "post" | "member" | "viewer";
}

export const eventQuery = ":eventId([0-9]+)/:tab(info|post|member|viewer)";

export const setEventPageQuery = (
	eventId: EventPageQuery["eventId"],
	tab?: EventPageQuery["tab"]
): PageParams => ({
	eventId: String(eventId),
	tab: tab || "info",
});

export const getEventPageQuery = (): EventPageQuery => {
	const { eventId, tab } = useParams();

	return {
		eventId: Number(eventId),
		tab: tab as EventPageQuery["tab"],
	};
};
