import { CardGrid, Footer } from "@vkontakte/vkui";
import React from "react";
import { GarageCard } from "./GarageCard";

interface Props {
	garageList: [];
}

export const ProfileGarage: React.FC<Props> = ({ garageList }) => {
	return (
		<div>
			<CardGrid size="l">
				{garageList.map(({ id, brand, model, date, description, photo }) => (
					<GarageCard
						key={id}
						brand={brand}
						model={model}
						date={date}
						description={description}
						img={photo}
					/>
				))}
			</CardGrid>
			{garageList.length === 0 && <Footer>У вас пока нет машин</Footer>}
		</div>
	);
};
