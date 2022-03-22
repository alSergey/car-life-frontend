import { CreateClubForm } from "./api.types";
import { isCreateClubFormFilled } from "./api.utils";
import { api } from "../../../api";
import { backBaseUrl } from "../../../constants/url";

export const createNewClub = (form: CreateClubForm) => {
	if (!isCreateClubFormFilled(form)) throw new Error("Не заполнены все поля");

	return (
		api.club
			// @ts-ignore
			.createCreate({
				name: form.name,
				description: form.description,
			})
			.then(({ data }) => {
				if (!form.file) return;

				const formData = new FormData();
				formData.append("file-upload", form.file);

				return fetch(`${backBaseUrl}/clubs/${data.id}/upload`, {
					method: "POST",
					body: formData,
				}).then(() => data.id);
			})
	);
};
