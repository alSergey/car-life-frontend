import { api } from "../../../api";
import { CarForm, isCarFormFilled } from "../../../components/CreateCarForm";

export const createNewCar = (form: CarForm): Promise<number> => {
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
			if (!form.file) return data.id;

			return api.garage
				.uploadCreate(data.id, {
					"file-upload": form.file,
				})
				.then(() => data.id);
		});
};
