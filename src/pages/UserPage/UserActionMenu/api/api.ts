export const complainUser = (userId: number): Promise<number> => {
	console.log("complain user", userId);
	return Promise.resolve(1);
};
