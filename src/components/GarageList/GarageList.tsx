import React from "react";
import { Avatar, Banner, Card, CardGrid, Footer } from "@vkontakte/vkui";
import { GarageCard } from "./GarageCard";
import { GarageData } from "../../pages/ProfilePage/api/api.types";

interface Props {
	garageList: GarageData[];
	onClick: (id: number) => void;
}

export const GarageList: React.FC<Props> = ({ garageList }) => (
	<div>
		<CardGrid size="l">
			{garageList.map(({ id, brand, model, date, name, url }) => (
				<GarageCard
					key={id}
					brand={brand}
					model={model}
					date={date}
					name={name}
					img={url}
				/>
			))}
		</CardGrid>
		{garageList.length === 0 && <Footer>У вас пока нет машин</Footer>}
	</div>
);
