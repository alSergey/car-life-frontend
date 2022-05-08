import { PageParams, useParams } from "@happysanta/router";

export interface CarPageQuery {
	carId: number;
}

export const carQuery = ":carId([0-9]+)";

export const setCarPageQuery = (carId: CarPageQuery["carId"]): PageParams => ({
	carId: String(carId),
});

export const getCarPageQuery = (): CarPageQuery => {
	const { carId } = useParams();

	return {
		carId: Number(carId),
	};
};
