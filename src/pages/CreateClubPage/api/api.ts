import { api } from "../../../api";
import { backBaseUrl } from "../../../constants/url";
import { ClubForm, isClubFormFilled } from "../../../components/CreateClubForm";

export const createNewClub = (form: ClubForm): Promise<number> => {
	if (!isClubFormFilled(form)) throw new Error("Не заполнены все поля");

	return api.club
		.createCreate({
			name: form.name,
			description: form.description,
			avatar: "",
			tags: form.tags.map((el) => el.label),
		})
		.then(({ data }) => {
			if (!form.file) return data.id;

			const formData = new FormData();
			formData.append("file-upload", form.file);

			return fetch(`${backBaseUrl}/clubs/${data.id}/upload`, {
				method: "POST",
				body: formData,
			}).then(() => data.id);
		});
};
