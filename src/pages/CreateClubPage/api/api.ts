import { api } from "../../../api";
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

			return api.clubs
				.uploadCreate(data.id, {
					"file-upload": form.file,
				})
				.then(() => data.id);
		});
};
