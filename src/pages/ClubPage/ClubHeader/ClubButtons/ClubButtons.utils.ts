export const isShownClubMessagesButton = (userStatus: string): boolean =>
	userStatus === "participant" || userStatus === "admin";

export const isShownClubMemberRequestButton = (userStatus: string): boolean =>
	userStatus === "participant_request";

export const isShownClubMemberButton = (userStatus: string): boolean =>
	userStatus === "participant" || userStatus === "unknown";

export const getClubMemberButtonText = (userStatus: string): string => {
	if (userStatus === "participant") return "Покинуть клуб";

	return "Участвовать";
};

export const isShownClubSubscriberButton = (userStatus: string): boolean =>
	userStatus === "subscriber" || userStatus === "unknown";

export const getClubSubscriberButtonText = (userStatus: string): string => {
	if (userStatus === "subscriber") return "Отписаться";

	return "Подписаться";
};
