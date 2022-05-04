import { PageParams, useParams } from "@happysanta/router";

export interface UserPageQuery {
	userId: number;
	tab: "info" | "garage" | "club" | "event";
}

export const userQuery = ":userId([0-9]+)/:tab(info|garage|club|event)";

export const setUserPageQuery = (
	userId: UserPageQuery["userId"],
	tab?: UserPageQuery["tab"]
): PageParams => ({
	userId: String(userId),
	tab: tab || "info",
});

export const getUserPageQuery = (): UserPageQuery => {
	const { userId, tab } = useParams();

	return {
		userId: Number(userId),
		tab: tab as UserPageQuery["tab"],
	};
};
