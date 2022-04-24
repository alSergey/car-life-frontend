import { RegForm } from "./api.types";
import { api } from "../../../api";

export const regUser = (form: RegForm): Promise<string> => {
	if (!form.userForm) throw new Error("Не заполнены все поля");

	return api.signup
		.signupCreate({
			avatarUrl: form.userForm.photo_max_orig,
			vkid: form.userForm.id,
			name: form.userForm.first_name,
			surname: form.userForm.last_name,
			description: form.userAboutForm?.description,
			tags: form.userAboutForm?.tags.map(({ label }) => label),
			garage: form.carForm
				? [
						{
							brand: form.carForm.brand,
							model: form.carForm.model,
							body: form.carForm.body,
							engine: form.carForm.engine,
							date: new Date(form.carForm.date).toISOString(),
							horsePower: form.carForm.horsePower,
							name: form.carForm.name,
							description: form.carForm.description,
						},
				  ]
				: [],
		})
		.then(({ data }) => {
			if (!form.carForm?.file) return data.session.value;

			return api.garage
				.uploadCreate(data.car_id, {
					"file-upload": form.carForm.file,
				})
				.then(() => data.session.value);
		});
};
