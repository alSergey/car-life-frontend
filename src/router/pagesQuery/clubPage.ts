import { PageParams, useParams } from "@happysanta/router";

export interface ClubPageQuery {
	clubId: number;
}

export const clubIdQuery = ":clubId([0-9]+)";

export const setClubPageQuery = (
	clubId: ClubPageQuery["clubId"]
): PageParams => ({
	clubId: String(clubId),
});

export const getClubPageQuery = (): ClubPageQuery => {
	const { clubId } = useParams();

	return {
		clubId: Number(clubId),
	};
};
