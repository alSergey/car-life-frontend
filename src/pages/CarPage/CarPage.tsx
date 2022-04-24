import React, { useEffect, useState } from "react";
import {
	Div,
	Group,
	Title,
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Text,
} from "@vkontakte/vkui";
import styles from "./CarPage.module.css";
import { CarHeader } from "./CarHeader";
import { getCarPageQuery } from "../../router";
import { emptyCarData, getCar } from "./api";
import { getPrettyYear } from "../../constants/time";

interface Prop {
	id: string;
	onBackClick?: () => void;
}

export const CarPage: React.FC<Prop> = ({ id, onBackClick }) => {
	const { carId } = getCarPageQuery();

	const [carData, setCarData] = useState(emptyCarData);

	const handleGetCarData = async (): Promise<void> => {
		try {
			const data = await getCar(carId);
			setCarData(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		handleGetCarData();
	}, []);

	return (
		<Panel id={id}>
			<PanelHeader
				left={onBackClick && <PanelHeaderBack onClick={onBackClick} />}
			>
				{!!carData.name ? carData.name : `${carData.brand} ${carData.model}`}
			</PanelHeader>
			<CarHeader img={carData.avatar_url} />
			<Div>
				{carData.brand && (
					<Group>
						<Title level="3" weight="1">
							Марка
						</Title>
						<Text weight="regular" className={styles.text}>
							{carData.brand}
						</Text>
					</Group>
				)}
				{carData.model && (
					<Group>
						<Title level="3" weight="1">
							Модель
						</Title>
						<Text weight="regular" className={styles.text}>
							{carData.model}
						</Text>
					</Group>
				)}
				{carData.body && (
					<Group>
						<Title level="3" weight="1">
							Кузов
						</Title>
						<Text weight="regular" className={styles.text}>
							{carData.body}
						</Text>
					</Group>
				)}
				{carData.engine && (
					<Group>
						<Title level="3" weight="1">
							Мотор
						</Title>
						<Text weight="regular" className={styles.text}>
							{carData.engine}
						</Text>
					</Group>
				)}
				{carData.date && (
					<Group>
						<Title level="3" weight="1">
							Год выпуска
						</Title>
						<Text weight="regular" className={styles.text}>
							{getPrettyYear(carData.date)}
						</Text>
					</Group>
				)}
				{carData.horse_power && (
					<Group>
						<Title level="3" weight="1">
							Лошадиные силы
						</Title>
						<Text weight="regular" className={styles.text}>
							{carData.horse_power}
						</Text>
					</Group>
				)}
				{carData.name && (
					<Group>
						<Title level="3" weight="1">
							Кличка автомобиля
						</Title>
						<Text weight="regular" className={styles.text}>
							{carData.name}
						</Text>
					</Group>
				)}
				{carData.description && (
					<Group>
						<Title level="3" weight="1">
							Подробности
						</Title>
						<Text weight="regular" className={styles.text}>
							{carData.description}
						</Text>
					</Group>
				)}
			</Div>
		</Panel>
	);
};
