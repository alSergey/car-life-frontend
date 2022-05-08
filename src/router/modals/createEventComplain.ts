import { PageParams, useParams } from "@happysanta/router";

export interface CreateEventComplainModalQuery {
	modalEventId: number;
}

export const CREATE_EVENT_COMPLAIN_MODAL = "create_event_complain_modal";

export const setCreateEventComplainModalQuery = (
	modalEventId: CreateEventComplainModalQuery["modalEventId"]
): PageParams => ({
	modalEventId: String(modalEventId),
});

export const getCreateEventComplainModalQuery =
	(): CreateEventComplainModalQuery => {
		const { modalEventId } = useParams();

		return {
			modalEventId: Number(modalEventId),
		};
	};
