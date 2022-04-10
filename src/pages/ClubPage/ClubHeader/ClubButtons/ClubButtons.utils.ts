export const getClubMemberButtonText = (userStatus: string): string => {
	if (userStatus === "participant") return "Вы участник";
	if (userStatus === "participant_request") return "Обработка заявки";

	return "Участвовать";
};

export const isShownClubMemberButton = (userStatus: string): boolean =>
	userStatus === "participant_request" || userStatus === "unknown";

export const isDisabledClubMemberButton = (userStatus: string): boolean =>
	userStatus !== "unknown";

export const getClubSubscriberButtonText = (userStatus: string): string => {
	if (userStatus === "subscriber") return "Вы подписаны";

	return "Подписаться";
};

export const isShownClubSubscriberButton = (userStatus: string): boolean =>
	userStatus === "subscriber" || userStatus === "unknown";

export const isDisabledClubSubscriberButton = (userStatus: string): boolean =>
	userStatus !== "unknown";

export const isShownClubMessagesButton = (userStatus: string): boolean =>
	userStatus === "participant" || userStatus === "admin";
