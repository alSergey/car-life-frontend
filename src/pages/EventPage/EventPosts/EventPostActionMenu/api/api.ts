export const deleteEventPost = (postId: number): Promise<number> => {
	console.log("delete post", postId);
	return Promise.resolve(1);
};

export const complainEventPost = (postId: number): Promise<number> => {
	console.log("complain post", postId);
	return Promise.resolve(1);
};
