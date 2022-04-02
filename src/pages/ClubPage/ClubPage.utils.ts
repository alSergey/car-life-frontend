export const isShownClubMemberButton = (userStatus: string): boolean =>
	userStatus === "subscriber" ||
	userStatus === "unknown" ||
	userStatus === "participant_request";

export const isDisabledClubMemberButton = (userStatus: string): boolean =>
	userStatus === "participant_request";
