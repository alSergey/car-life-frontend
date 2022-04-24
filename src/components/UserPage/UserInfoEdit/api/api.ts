import { api } from "../../../../api";
import { UserAboutForm } from "../../../CreateUserAboutForm";

export const updateUserInfo = (input: UserAboutForm): Promise<number> =>
	api.me
		.updateUpdate({
			description: input.description,
			tags: input.tags.map(({ label }) => label),
		})
		.then(({ data }) => data.vkid);
