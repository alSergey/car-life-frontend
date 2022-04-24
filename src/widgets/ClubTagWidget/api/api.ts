import { ClubTags } from "./api.types";
import { api } from "../../../api";

export const getTagsList = (): Promise<ClubTags[]> =>
	api.clubs.tagsList().then(({ data }) =>
		data.map(({ name }) => ({
			value: name,
			label: name,
		}))
	);
