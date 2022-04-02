import { api } from "../../../../api";
import { ModelsCarCard } from "../../../../api/Api";

export const getClubGarageList = (id: number): Promise<ModelsCarCard[]> =>
	api.clubs.carsDetail(id).then(({ data }) => data);
