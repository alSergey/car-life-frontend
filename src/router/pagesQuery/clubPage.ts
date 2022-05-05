import { PageParams, useParams } from "@happysanta/router";

export interface ClubPageQuery {
	clubId: number;
	tab: "event" | "garage" | "member" | "subscriber";
}

export const clubQuery = ":clubId([0-9]+)/:tab(event|garage|member|subscriber)";

export const setClubPageQuery = (
	clubId: ClubPageQuery["clubId"],
	tab?: ClubPageQuery["tab"]
): PageParams => ({
	clubId: String(clubId),
	tab: tab || "event",
});

export const getClubPageQuery = (): ClubPageQuery => {
	const { clubId, tab } = useParams();

	return {
		clubId: Number(clubId),
		tab: tab as ClubPageQuery["tab"],
	};
};
