import { PageParams, useParams } from "@happysanta/router";

export interface CreateEventPostComplainModalQuery {
	modalEventPostId: number;
}

export const CREATE_EVENT_POST_COMPLAIN_MODAL =
	"create_event_post_complain_modal";

export const setCreateEventPostComplainModalQuery = (
	modalEventPostId: CreateEventPostComplainModalQuery["modalEventPostId"]
): PageParams => ({
	modalEventPostId: String(modalEventPostId),
});

export const getCreateEventPostComplainModalQuery =
	(): CreateEventPostComplainModalQuery => {
		const { modalEventPostId } = useParams();

		return {
			modalEventPostId: Number(modalEventPostId),
		};
	};
