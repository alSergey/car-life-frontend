import { RegForm } from "./api.types";
import { api } from "../../../api";
import { backBaseUrl } from "../../../constants/url";

export const regUser = (form: RegForm): Promise<number | undefined> => {
	if (!form.favForm) throw new Error("Не заполнены все поля");

	return api.signup
		.signupCreate({
			avatarUrl: "",
			vkid: 14,
			name: "Але",
			surname: "Сер",
			garage: form.carForm
				? [
						{
							brand: form.carForm.brand,
							model: form.carForm.model,
							date: new Date(form.carForm.date).toISOString(),
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
