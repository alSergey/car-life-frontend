export const isShownEventMemberButton = (userStatus: string): boolean =>
	userStatus === "spectator" ||
	userStatus === "unknown" ||
	userStatus === "participant_request";

export const isDisabledEventMemberButton = (userStatus: string): boolean =>
	userStatus === "participant_request";
