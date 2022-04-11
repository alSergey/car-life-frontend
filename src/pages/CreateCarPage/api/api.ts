import { api } from "../../../api";
import { backBaseUrl } from "../../../constants/url";
import { CarForm, isCarFormFilled } from "../../../components/CreateCarForm";

export const createNewCar = (form: CarForm): Promise<number | undefined> => {
	if (!isCarFormFilled(form)) throw new Error("Не заполнены все поля");

	const date = new Date();
	date.setFullYear(+form.date);

	return api.newCar
		.newCarCreate({
			body: form.body,
			brand: form.brand,
			date: date.toISOString(),
			description: form.description,
			engine: form.engine,
			horsePower: form.horsePower,
			model: form.model,
			name: form.name,
		})
		.then(({ data }) => {
			if (!form.file) return;

			const formData = new FormData();
			formData.append("file-upload", form.file);

			return fetch(`${backBaseUrl}/garage/${data.id}/upload`, {
				method: "POST",
				body: formData,
			}).then(() => data.id);
		});
};
