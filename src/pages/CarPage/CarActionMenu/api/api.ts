import { api } from "../../../../api";

export const deleteCar = (carId: number): Promise<number> =>
	api.garage.deleteCreate(carId).then(({ status }) => status);
