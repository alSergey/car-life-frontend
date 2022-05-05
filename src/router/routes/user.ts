import { Router, useParams } from "@happysanta/router";

export interface UserPageQuery {
	userId: number;
}

const USER_PAGE = "user/:userId([0-9]+)";

export const getUserPage = (prefix: string): string => `${prefix}/${USER_PAGE}`;

export const redirectUserPage = (
	router: Router,
	prefix: string,
	{ userId }: UserPageQuery
): void => {
	router.pushPage(getUserPage(prefix), {
		userId: String(userId),
	});
};

export const getUserPageQuery = (): UserPageQuery => {
	const { userId } = useParams();

	return {
		userId: Number(userId),
	};
};
