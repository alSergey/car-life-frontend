import React, {
	Fragment,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import {
	Div,
	Group,
	Title,
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Text,
	PanelHeaderButton,
	Caption,
	Avatar,
} from "@vkontakte/vkui";
import { Icon28MoreHorizontal } from "@vkontakte/icons";
import styles from "./CarPage.module.css";
import { CarActionMenu } from "./CarActionMenu";
import { CarHeader } from "./CarHeader";
import { getCarPageQuery } from "../../router";
import { getPrettyYear } from "../../constants/time";
import { emptyCarData, getCar } from "./api";
import { UserContext } from "../../context/userContext";

interface Prop {
	id: string;
	setPopout: (popout: ReactNode | null) => void;
	onBackClick: () => void;
	onUserClick: (userId: number) => void;
}

export const CarPage: React.FC<Prop> = ({
	id,
	setPopout,
	onBackClick,
	onUserClick,
}) => {
	const { carId } = getCarPageQuery();

	const { userState } = useContext(UserContext);
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

	const openPopout = () => {
		setPopout(
			<CarActionMenu
				carId={carId}
				userStatus={carData.owner.id === userState.id ? "owner" : "unknown"}
				onClose={() => setPopout(null)}
				onDelete={onBackClick}
			/>
		);
	};

	return (
		<Panel id={id}>
			<PanelHeader
				before={
					<Fragment>
						<PanelHeaderBack onClick={onBackClick} />
						<PanelHeaderButton aria-label="Меню">
							<Icon28MoreHorizontal onClick={openPopout} />
						</PanelHeaderButton>
					</Fragment>
				}
			>
				{!!carData.name ? carData.name : `${carData.brand} ${carData.model}`}
			</PanelHeader>
			<CarHeader img={carData.avatar_url} />
			<Group onClick={() => onUserClick(carData.owner.id)}>
				<div className={styles.userContainer}>
					<div className={styles.userTextContainer}>
						<Caption level="3" weight="3">
							Hosted by
						</Caption>
						<Title level="3" weight="2">
							{carData.owner.name} {carData.owner.surname}
						</Title>
					</div>
					<Avatar
						className={styles.avatar}
						size={45}
						src={carData.owner.avatar_url}
					/>
				</div>
			</Group>
			<Div>
				{carData.brand && (
					<Group>
						<Title level="3" weight="1">
							Марка
						</Title>
						<Text weight="3" className={styles.text}>
							{carData.brand}
						</Text>
					</Group>
				)}
				{carData.model && (
					<Group>
						<Title level="3" weight="1">
							Модель
						</Title>
						<Text weight="3" className={styles.text}>
							{carData.model}
						</Text>
					</Group>
				)}
				{carData.body && (
					<Group>
						<Title level="3" weight="1">
							Кузов
						</Title>
						<Text weight="3" className={styles.text}>
							{carData.body}
						</Text>
					</Group>
				)}
				{carData.engine && (
					<Group>
						<Title level="3" weight="1">
							Мотор
						</Title>
						<Text weight="3" className={styles.text}>
							{carData.engine}
						</Text>
					</Group>
				)}
				{carData.date && (
					<Group>
						<Title level="3" weight="1">
							Год выпуска
						</Title>
						<Text weight="3" className={styles.text}>
							{getPrettyYear(carData.date)}
						</Text>
					</Group>
				)}
				{carData.horse_power && (
					<Group>
						<Title level="3" weight="1">
							Лошадиные силы
						</Title>
						<Text weight="3" className={styles.text}>
							{carData.horse_power}
						</Text>
					</Group>
				)}
				{carData.name && (
					<Group>
						<Title level="3" weight="1">
							Кличка автомобиля
						</Title>
						<Text weight="3" className={styles.text}>
							{carData.name}
						</Text>
					</Group>
				)}
				{carData.description && (
					<Group>
						<Title level="3" weight="1">
							Подробности
						</Title>
						<Text weight="3" className={styles.text}>
							{carData.description}
						</Text>
					</Group>
				)}
			</Div>
		</Panel>
	);
};
