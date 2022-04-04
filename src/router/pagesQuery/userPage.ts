import { PageParams, useParams } from "@happysanta/router";

export interface UserPageQuery {
	userId?: number;
}

export const userIdQuery = ":userId([0-9]+)?";

export const setUserPageQuery = (
	userId: UserPageQuery["userId"]
): PageParams => {
	if (!userId) {
		return {};
	}

	return {
		userId: String(userId),
	};
};

export const getUserPageQuery = (): UserPageQuery => {
	const { userId } = useParams();

	return {
		userId: Number(userId),
	};
};
