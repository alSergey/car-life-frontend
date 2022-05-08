import { api } from "../../../api";
import { ComplainForm } from "../../../components/CreateComplainForm/api";

export const complainUser = (
	userId: number,
	form: ComplainForm
): Promise<number> =>
	api.user
		.complainCreate(userId, {
			text: form.text,
		})
		.then(({ status }) => status);
