import { CarData } from "./api.types";
import { api } from "../../../api";

export const getCar = (carId: number): Promise<CarData> =>
	api.garage.garageDetail(carId).then(({ data }) => ({
		id: data.id,
		brand: data.brand,
		model: data.model,
		body: data.body,
		engine: data.engine,
		date: data.date,
		horse_power: data.horse_power,
		name: data.name,
		description: data.description,
		avatar_url: data.avatar_url,
	}));
