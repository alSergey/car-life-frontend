import { api } from "../../../../../api";

export const deleteEventPost = (postId: number): Promise<number> =>
	api.eventPosts.deleteCreate(postId).then(({ status }) => status);
