import { PageParams, useParams } from "@happysanta/router";

export interface CreateClubComplainModalQuery {
	modalClubId: number;
}

export const CREATE_CLUB_COMPLAIN_MODAL = "create_club_complain_modal";

export const setCreateClubComplainModalQuery = (
	modalClubId: CreateClubComplainModalQuery["modalClubId"]
): PageParams => ({
	modalClubId: String(modalClubId),
});

export const getCreateClubComplainModalQuery =
	(): CreateClubComplainModalQuery => {
		const { modalClubId } = useParams();

		return {
			modalClubId: Number(modalClubId),
		};
	};
