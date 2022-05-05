import { Router, useParams } from "@happysanta/router";

export interface ClubPageQuery {
	clubId: number;
}

const CLUB_PAGE = "club/:clubId([0-9]+)";

export const getClubPage = (prefix: string): string => `${prefix}/${CLUB_PAGE}`;

export const redirectClubPage = (
	router: Router,
	prefix: string,
	{ clubId }: ClubPageQuery
): void => {
	router.pushPage(getClubPage(prefix), {
		clubId: String(clubId),
	});
};

export const getClubPageQuery = (): ClubPageQuery => {
	const { clubId } = useParams();

	return {
		clubId: Number(clubId),
	};
};
