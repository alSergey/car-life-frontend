import { PageParams, useParams } from "@happysanta/router";

export interface CreateEventPostModalQuery {
	modalEventId: number;
}

export const CREATE_EVENT_POST_MODAL = "create_event_post_modal";

export const setCreateEventPostModalQuery = (
	modalEventId: CreateEventPostModalQuery["modalEventId"]
): PageParams => ({
	modalEventId: String(modalEventId),
});

export const getCreateEventPostModalQuery = (): CreateEventPostModalQuery => {
	const { modalEventId } = useParams();

	return {
		modalEventId: Number(modalEventId),
	};
};
