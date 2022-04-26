import { api } from "../../../../api";
import { ModelsEventPost } from "../../../../api/Api";

export const getEventPosts = (eventId: number): Promise<ModelsEventPost[]> =>
	api.eventPosts.eventPostsDetail(eventId).then(({ data }) => data);
