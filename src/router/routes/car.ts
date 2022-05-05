import { Router, useParams } from "@happysanta/router";

export interface CarPageQuery {
	carId: number;
}

const CAR_PAGE = "car/:carId([0-9]+)";

export const getCarPage = (prefix: string): string => `${prefix}/${CAR_PAGE}`;

export const redirectCarPage = (
	router: Router,
	prefix: string,
	{ carId }: CarPageQuery
): void => {
	router.pushPage(getCarPage(prefix), {
		carId: String(carId),
	});
};

export const getCarPageQuery = (): CarPageQuery => {
	const { carId } = useParams();

	return {
		carId: Number(carId),
	};
};
