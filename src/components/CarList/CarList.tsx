import React from "react";
import { Div, Footer, Group } from "@vkontakte/vkui";
import { CarCard } from "./CarCard";

interface CarInfo {
	id: number;
	brand: string;
	model: string;
	date: string;
	name: string;
	avatar_url: string;
}

interface Props {
	carList: CarInfo[];
	onClick: (id: number) => void;
}

export const CarList: React.FC<Props> = ({ carList }) => (
	<Div>
		<Group>
			{carList.map(({ id, brand, model, date, name, avatar_url }) => (
				<CarCard
					key={id}
					brand={brand}
					model={model}
					date={date}
					name={name}
					img={avatar_url}
				/>
			))}
		</Group>
		{carList.length === 0 && <Footer>Ничего не найдено</Footer>}
	</Div>
);
