import { RegForm } from "./api.types";
import { api } from "../../../api";
import { backBaseUrl } from "../../../constants/url";

export const regUser = (form: RegForm): Promise<number | undefined> => {
	if (!form.userForm || !form.favForm || !form.carForm)
		throw new Error("Не заполнены все поля");

	return api.signup
		.signupCreate({
			avatarUrl: form.userForm.photo_max_orig,
			vkid: form.userForm.id,
			name: form.userForm.first_name,
			surname: form.userForm.last_name,
			garage: [
				{
					brand: form.carForm.brand,
					model: form.carForm.model,
					date: new Date(`${form.carForm.date}T$00:00:00Z`).toISOString(),
					description: form.carForm.description,
				},
			],
			tags: form.favForm.tags.map(({ value }) => value),
		})
		.then(({ data }) => {
			if (!form.carForm?.file) return;

			const formData = new FormData();
			formData.append("file-upload", form.carForm.file);

			return fetch(`${backBaseUrl}/garage/${data.vkid}/upload`, {
				method: "POST",
				body: formData,
			}).then(() => data.vkid);
		});
};
