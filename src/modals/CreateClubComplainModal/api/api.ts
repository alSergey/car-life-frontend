import { api } from "../../../api";
import { ComplainForm } from "../../../components/CreateComplainForm/api";

export const complainClub = (
	clubId: number,
	form: ComplainForm
): Promise<number> =>
	api.clubs
		.complainCreate(clubId, {
			text: form.text,
		})
		.then(({ status }) => status);
