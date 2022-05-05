import { Router, useParams } from "@happysanta/router";

export interface EventPageQuery {
	eventId: number;
}

const EVENT_PAGE = "event/:eventId([0-9]+)";

export const getEventPage = (prefix: string): string =>
	`${prefix}/${EVENT_PAGE}`;

export const redirectEventPage = (
	router: Router,
	prefix: string,
	{ eventId }: EventPageQuery
): void => {
	router.pushPage(getEventPage(prefix), {
		eventId: String(eventId),
	});
};

export const getEventPageQuery = (): EventPageQuery => {
	const { eventId } = useParams();

	return {
		eventId: Number(eventId),
	};
};
