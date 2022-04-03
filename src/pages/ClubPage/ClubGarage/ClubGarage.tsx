import React, { useEffect, useState } from "react";
import { Group } from "@vkontakte/vkui";
import { emptyClubGarageList, getClubGarageList } from "./api";
import { CarList } from "../../../components/CarList";

interface Props {
	clubId: number;
	onClick: (id: number) => void;
}

export const ClubGarage: React.FC<Props> = ({ clubId, onClick }) => {
	const [garageList, setGarageList] = useState(emptyClubGarageList);

	const handleGetGarageList = async (): Promise<void> => {
		try {
			const data = await getClubGarageList(clubId);
			setGarageList(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		handleGetGarageList();
	}, []);

	return (
		<Group>
			<CarList carList={garageList} onClick={onClick} />
		</Group>
	);
};
