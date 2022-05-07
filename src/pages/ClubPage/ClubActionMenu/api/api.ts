export const deleteClub = (clubId: number): Promise<number> => {
	console.log("delete club", clubId);
	return Promise.resolve(1);
};

export const complainClub = (clubId: number): Promise<number> => {
	console.log("complain club", clubId);
	return Promise.resolve(1);
};
