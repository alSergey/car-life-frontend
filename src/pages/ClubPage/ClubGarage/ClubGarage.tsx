import React, { useEffect, useState } from "react";
import { emptyClubGarageList, getClubGarageList } from "./api";
import { GarageList } from "../../../components/GarageList";

interface Props {
	clubId: number;
	onClick: (id: number) => void;
}

export const ClubGarage: React.FC<Props> = ({ clubId, onClick }) => {
	const [garageList, setGarageList] = useState(emptyClubGarageList);

	const handleGetGarageList = async (): Promise<void> => {
		try {
			const data = await getClubGarageList(clubId);
			// TODO: реализовать
			console.log(data);
			setGarageList(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		handleGetGarageList();
	}, []);

	return <GarageList garageList={[]} onClick={onClick} />;
};
