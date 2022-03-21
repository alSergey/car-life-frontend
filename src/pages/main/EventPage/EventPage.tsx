import {
	Avatar,
	Button,
	Div,
	Gallery,
	Group,
	Header,
	Panel,
	PanelHeader,
	PanelHeaderBack,
	SimpleCell,
	Tabs,
	TabsItem,
	Text,
	Title,
} from "@vkontakte/vkui";
import React, { useEffect, useState } from "react";

import styles from "./EventPage.module.css";
import { emptyEventData, getEvent } from "./api";

interface Props {
	id: string;
	eventId: number;
	onBackClick: () => void;
}

enum Tab {
	Info = "info",
	Members = "members",
	Garage = "garage",
	Posts = "posts",
}

export const EventPage: React.FC<Props> = ({ id, eventId, onBackClick }) => {
	const [activeTab, setActiveTab] = useState(Tab.Info);
	const [eventData, setEventData] = useState(emptyEventData);

	const handleGetEventData = async (): Promise<void> => {
		try {
			const data = await getEvent(eventId);
			setEventData(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		handleGetEventData();
	}, []);

	return (
		<Panel id={id}>
			<PanelHeader
				left={
					<PanelHeaderBack className={styles.backIcon} onClick={onBackClick} />
				}
			>
				Событие
			</PanelHeader>
			<img src={eventData.avatar} alt="" />
			<Group separator="hide" style={{ marginLeft: 15 }}>
				<Title level="1" style={{ marginBottom: 16 }} weight="bold">
					{eventData.name}
				</Title>
				<Title level="3" weight="semibold">
					{new Date(eventData.event_date).toLocaleString()}
				</Title>
				<Div
					style={{ justifyContent: "center", paddingBottom: 0, paddingLeft: 0 }}
				>
					<Button mode="outline" size="m" type="submit" width={200}>
						Участвовать
					</Button>
				</Div>
			</Group>
			<Tabs style={{ fontSize: "10px", lineHeight: "12px" }}>
				<TabsItem
					selected={activeTab === Tab.Info}
					onClick={() => setActiveTab(Tab.Info)}
				>
					Подробности
				</TabsItem>
				<TabsItem
					selected={activeTab === Tab.Members}
					onClick={() => setActiveTab(Tab.Members)}
				>
					Участники
				</TabsItem>
				<TabsItem
					selected={activeTab === Tab.Garage}
					onClick={() => setActiveTab(Tab.Garage)}
				>
					Гараж
				</TabsItem>
				<TabsItem
					selected={activeTab === Tab.Posts}
					onClick={() => setActiveTab(Tab.Posts)}
				>
					Посты
				</TabsItem>
			</Tabs>
			{activeTab === Tab.Info && (
				<Group>
					<SimpleCell
						before={
							<Avatar src="https://lowdaily.ru/wp-content/uploads/2018/06/royal-auto-show-DSC04553.jpg" />
						}
					>
						Car Club
					</SimpleCell>
					<Group style={{ padding: 15 }}>
						<Title level="3" weight="semibold" style={{ marginBottom: 16 }}>
							Москва
						</Title>
						<Text weight="regular">{eventData.description}</Text>
					</Group>
				</Group>
			)}
			{activeTab === Tab.Members && <Group>Здесь скоро будут участники</Group>}
			{activeTab === Tab.Garage && (
				<Group header={<Header mode="secondary">Вы увидите</Header>}>
					<Gallery
						slideWidth="100%"
						align="center"
						style={{ height: "300px" }}
						bullets="dark"
						showArrows
					>
						<div
							style={{
								backgroundImage:
									"url('https://i.ytimg.com/vi/0zler_phm3M/maxresdefault.jpg')",
								backgroundSize: "cover",
							}}
						/>
						<div
							style={{
								backgroundImage:
									"url('https://i.pinimg.com/originals/8b/33/dc/8b33dce321d56d9bf1248981d276864f.jpg')",
								backgroundSize: "cover",
							}}
						/>
						<div
							style={{
								backgroundImage: "url('https://a.d-cd.net/ee6e5a6s-960.jpg')",
								backgroundSize: "cover",
							}}
						/>
					</Gallery>
				</Group>
			)}
			{activeTab === Tab.Posts && <Group>Здесь скоро будут посты</Group>}
		</Panel>
	);
};
