export const isAddButtonShown = (userStatus: string): boolean =>
	userStatus === "participant" || userStatus === "admin";
