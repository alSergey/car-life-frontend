import { ClubTags } from "./api.types";
import { api } from "../../../api";

export const getTagsList = (): Promise<ClubTags[]> =>
	api.clubs.tagsList().then(({ data }) =>
		data.map((el) => ({
			value: String(el.id),
			label: el.name,
		}))
	);
