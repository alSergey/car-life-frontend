import { PageParams, useParams } from "@happysanta/router";

export interface EventPageQuery {
	eventId: number;
}

export const eventQuery = ":eventId([0-9]+)";

export const setEventPageQuery = (
	eventId: EventPageQuery["eventId"]
): PageParams => ({
	eventId: String(eventId),
});

export const getEventPageQuery = (): EventPageQuery => {
	const { eventId } = useParams();

	return {
		eventId: Number(eventId),
	};
};
