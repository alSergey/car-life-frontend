import { api } from "../../../api";
import { UserData } from "../../../context/userContext";

export const getUserData = (id: number): Promise<UserData> =>
	api.user.userDetail(id).then(({ data }) => ({
		id: data.vkid,
		name: data.name,
		surname: data.surname,
		avatar: data.avatar_url,
		tags: data.tags,
		description: data.description,
	}));
