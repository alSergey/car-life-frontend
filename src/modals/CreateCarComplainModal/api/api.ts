import { api } from "../../../api";
import { ComplainForm } from "../../../components/CreateComplainForm/api";

export const complainCar = (
	carId: number,
	form: ComplainForm
): Promise<number> =>
	api.garage
		.complainCreate(carId, {
			text: form.text,
		})
		.then(({ status }) => status);
