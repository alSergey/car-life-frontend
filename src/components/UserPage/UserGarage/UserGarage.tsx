import React, { useEffect, useState } from "react";
import { CarList } from "../../CarList";
import { emptyCarList, getCarList } from "./api";
import { CreateCarButton } from "./CreateCarButton";

interface Props {
	userId: number;
	onClick: (id: number) => void;
	onCreateClick?: () => void;
}

export const UserGarage: React.FC<Props> = ({
	userId,
	onClick,
	onCreateClick,
}) => {
	const [carList, setCarList] = useState(emptyCarList);

	const handleGetCarList = async (): Promise<void> => {
		try {
			const data = await getCarList(userId);
			setCarList(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		handleGetCarList();
	}, []);

	return (
		<div>
			<CarList carList={carList} onClick={onClick} />
			{onCreateClick && <CreateCarButton onClick={onCreateClick} />}
		</div>
	);
};
