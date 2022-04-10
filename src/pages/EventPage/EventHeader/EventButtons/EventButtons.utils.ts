export const getEventMemberButtonText = (userStatus: string): string => {
	if (userStatus === "participant") return "Вы участник";
	if (userStatus === "participant_request") return "Обработка заявки";

	return "Участвовать";
};

export const isShownEventMemberButton = (userStatus: string): boolean =>
	userStatus === "participant_request" || userStatus === "unknown";

export const isDisabledEventMemberButton = (userStatus: string): boolean =>
	userStatus !== "unknown";

export const getEventViewerButtonText = (userStatus: string): string => {
	if (userStatus === "spectator") return "Вы поедите";

	return "Поеду";
};

export const isShownEventViewerButton = (userStatus: string): boolean =>
	userStatus === "spectator" || userStatus === "unknown";

export const isDisabledEventViewerButton = (userStatus: string): boolean =>
	userStatus !== "unknown";

export const isShownEventMessagesButton = (userStatus: string): boolean =>
	userStatus === "participant" || userStatus === "admin";
