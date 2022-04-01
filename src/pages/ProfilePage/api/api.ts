import { api } from "../../../api";
import { UserData } from "./api.types";

export const getUserInfo = async (): Promise<UserData> =>
	api.me.getMe().then(({ data }) => ({
		id: data.vkid,
		name: data.name,
		surname: data.surname,
		avatar: data.avatar_url,
		info: {
			tags: data.tags,
			description: "Очень крутой человек",
		},
		garageList: data.garage.map((el) => ({
			id: el.id,
			brand: el.brand,
			model: el.model,
			date: el.date,
			description: el.description,
			photo: el.avatar_url,
		})),
	}));
