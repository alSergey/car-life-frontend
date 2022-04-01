import { RegForm } from "./api.types";
import { api } from "../../../api";
import { backBaseUrl } from "../../../constants/url";

export const regUser = (form: RegForm): Promise<number | undefined> => {
	console.log(form);
	if (!form.userForm || !form.favForm) throw new Error("Не заполнены все поля");

	return api.signup
		.signupCreate({
			avatarUrl: form.userForm.photo_max_orig,
			vkid: form.userForm.id,
			name: form.userForm.first_name,
			surname: form.userForm.last_name,
			description: form.favForm.description,
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
			tags: form.favForm.tags.map(({ label }) => label),
		})
		.then(({ data }) => {
			if (!form.carForm?.file || !data.garage[0]) return;

			const formData = new FormData();
			formData.append("file-upload", form.carForm.file);

			return fetch(`${backBaseUrl}/garage/${data.garage[0].id}/upload`, {
				method: "POST",
				body: formData,
			}).then(() => data.vkid);
		});
};
