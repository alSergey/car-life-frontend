import { OwnerClub } from "./api.types";
import { api } from "../../../api";

export const getOwnerClubList = (): Promise<OwnerClub[]> =>
	api.user.ownClubsList().then(({ data }) =>
		data.map(({ id, name, avatar }) => ({
			value: id,
			label: name,
			avatar,
		}))
	);
