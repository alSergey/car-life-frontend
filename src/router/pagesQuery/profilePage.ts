import { PageParams, useParams } from "@happysanta/router";

export interface ProfilePageQuery {
	tab: "info" | "garage" | "club" | "event";
}

export const profileQuery = ":tab(info|garage|club|event)";

export const setProfilePageQuery = (
	tab?: ProfilePageQuery["tab"]
): PageParams => ({
	tab: tab || "info",
});

export const getProfilePageQuery = (): ProfilePageQuery => {
	const { tab } = useParams();

	return {
		tab: tab as ProfilePageQuery["tab"],
	};
};
