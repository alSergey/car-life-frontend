import { PageParams, useParams } from "@happysanta/router";

export interface CreateUserComplainModalQuery {
	modalUserId: number;
}

export const CREATE_USER_COMPLAIN_MODAL = "create_user_complain_modal";

export const setCreateUserComplainModalQuery = (
	modalUserId: CreateUserComplainModalQuery["modalUserId"]
): PageParams => ({
	modalUserId: String(modalUserId),
});

export const getCreateUserComplainModalQuery =
	(): CreateUserComplainModalQuery => {
		const { modalUserId } = useParams();

		return {
			modalUserId: Number(modalUserId),
		};
	};
