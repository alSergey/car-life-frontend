import React from "react";
import { Footer } from "@vkontakte/vkui";
import { CarCard } from "./CarCard";
import styles from "./CarList.module.css";

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

export const CarList: React.FC<Props> = ({ carList, onClick }) => (
	<div style={{ width: "100%" }}>
		<div className={styles.list}>
			{carList.map(({ id, brand, model, date, name, avatar_url }) => (
				<CarCard
					key={id}
					brand={brand}
					model={model}
					date={date}
					name={name}
					img={avatar_url}
					onClick={() => onClick(id)}
				/>
			))}
		</div>
		{carList.length === 0 && <Footer>Ничего не найдено</Footer>}
	</div>
);
