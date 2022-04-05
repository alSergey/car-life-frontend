import { api } from "../../../../api";
import { ModelsCarCard } from "../../../../api/Api";

export const getCarList = (userId: number): Promise<ModelsCarCard[]> =>
	api.user.garageDetail(userId).then(({ data }) => data);
