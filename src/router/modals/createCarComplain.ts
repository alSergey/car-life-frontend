import { PageParams, useParams } from "@happysanta/router";

export interface CreateCarComplainModalQuery {
	modalCarId: number;
}

export const CREATE_CAR_COMPLAIN_MODAL = "create_car_complain_modal";

export const setCreateCarComplainModalQuery = (
	modalCarId: CreateCarComplainModalQuery["modalCarId"]
): PageParams => ({
	modalCarId: String(modalCarId),
});

export const getCreateCarComplainModalQuery =
	(): CreateCarComplainModalQuery => {
		const { modalCarId } = useParams();

		return {
			modalCarId: Number(modalCarId),
		};
	};
