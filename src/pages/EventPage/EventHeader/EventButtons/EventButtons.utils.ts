export const isShownEventMessagesButton = (userStatus: string): boolean =>
	userStatus === "participant" || userStatus === "admin";

export const isShownEventMemberRequestButton = (userStatus: string): boolean =>
	userStatus === "participant_request";

export const isShownEventMemberButton = (userStatus: string): boolean =>
	userStatus === "participant" || userStatus === "unknown";

export const getEventMemberButtonText = (userStatus: string): string => {
	if (userStatus === "participant") return "Покинуть событие";

	return "Участвовать";
};

export const isShownEventViewerButton = (userStatus: string): boolean =>
	userStatus === "spectator" || userStatus === "unknown";

export const getEventViewerButtonText = (userStatus: string): string => {
	if (userStatus === "spectator") return "Не поеду";

	return "Буду зрителем";
};
