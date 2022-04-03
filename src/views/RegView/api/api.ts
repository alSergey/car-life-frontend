import { RegForm } from "./api.types";
import { api } from "../../../api";
import { backBaseUrl } from "../../../constants/url";

export const regUser = (form: RegForm): Promise<number | undefined> => {
	// if (!form.userForm) throw new Error("Не заполнены все поля");

	return api.signup
		.signupCreate({
			avatarUrl: "",
			vkid: 1,
			name: "Name",
			surname: "Surname",
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
			if (!form.carForm?.file) return;

			const formData = new FormData();
			formData.append("file-upload", form.carForm.file);

			return fetch(`${backBaseUrl}/garage/${data.car_id}/upload`, {
				method: "POST",
				body: formData,
			}).then(() => data.car_id);
		});
};
