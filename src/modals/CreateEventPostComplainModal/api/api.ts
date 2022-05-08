import { api } from "../../../api";
import { ComplainForm } from "../../../components/CreateComplainForm/api";

export const complainEventPost = (
	postId: number,
	form: ComplainForm
): Promise<number> =>
	api.eventPosts
		.complainCreate(postId, {
			text: form.text,
		})
		.then(({ status }) => status);
