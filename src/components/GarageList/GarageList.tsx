import React from "react";
import { CardGrid, Footer } from "@vkontakte/vkui";
import { GarageCard } from "./GarageCard";

interface GarageInfo {
	id: number;
	brand: string;
	model: string;
	date: string;
	description: string;
	avatar_url: string;
}

interface Props {
	garageList: GarageInfo[];
	onClick: (id: number) => void;
}

export const GarageList: React.FC<Props> = ({ garageList }) => (
	<div>
		<CardGrid size="l">
			{garageList.map(({ id, brand, model, date, description, avatar_url }) => (
				<GarageCard
					key={id}
					brand={brand}
					model={model}
					date={date}
					description={description}
					img={avatar_url}
				/>
			))}
		</CardGrid>
		{garageList.length === 0 && <Footer>У вас пока нет машин</Footer>}
	</div>
);
