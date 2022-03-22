import { ClubTags, CreateClubForm } from "./api.types";
import { isCreateClubFormFilled } from "./api.utils";
import { api } from "../../../api";
import { backBaseUrl } from "../../../constants/url";

export const getTagsList = (): Promise<ClubTags[]> =>
	api.clubs.tagsList().then(({ data }) =>
		data.map((el) => ({
			value: String(el.id),
			label: el.name,
		}))
	);

export const createNewClub = (
	form: CreateClubForm
): Promise<number | undefined> => {
	if (!isCreateClubFormFilled(form)) throw new Error("Не заполнены все поля");

	return api.club
		.createCreate({
			name: form.name,
			description: form.description,
			avatar: "",
			tags: form.tags.map((el) => el.label),
		})
		.then(({ data }) => {
			if (!form.file) return;

			const formData = new FormData();
			formData.append("file-upload", form.file);

			return fetch(`${backBaseUrl}/clubs/${data.id}/upload`, {
				method: "POST",
				body: formData,
			}).then(() => data.id);
		});
};
