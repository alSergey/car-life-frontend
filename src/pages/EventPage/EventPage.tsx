import {
	Avatar,
	Button,
	ContentCard,
	Div,
	Gallery,
	Group,
	Header,
	Panel,
	PanelHeader,
	PanelHeaderBack,
	SimpleCell,
	SizeType,
	Subhead,
	Tabs,
	TabsItem,
	Text,
	Title,
	View,
} from "@vkontakte/vkui";
import React, { useEffect, useState } from "react";
import {
	ID_GARAGE,
	ID_INFO,
	ID_MEMBERS,
	ID_POSTS,
} from "../../constants/config";
import { apiGetEvent } from "./action/action";
import { emptyEventData } from "./action/action.consts";

interface Props {
	id: string;
	eventPage: number;
	onClick: () => void;
}

export const EventPage: React.FC<Props> = (props) => {
	const [activeTab, setActiveTab] = useState(ID_INFO);
	const [eventData, setEventData] = useState(emptyEventData);
	const { id, eventPage, onClick } = props;

	const getData = async (): Promise<void> => {
		try {
			const data = await apiGetEvent(eventPage);
			setEventData(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<Panel id={id}>
			<PanelHeader left={<PanelHeaderBack onClick={onClick} />}>
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
					selected={activeTab === ID_INFO}
					onClick={() => {
						setActiveTab(ID_INFO);
					}}
				>
					Подробности
				</TabsItem>
				<TabsItem
					selected={activeTab === ID_MEMBERS}
					onClick={() => {
						setActiveTab(ID_MEMBERS);
					}}
				>
					Участники
				</TabsItem>
				<TabsItem
					selected={activeTab === ID_GARAGE}
					onClick={() => {
						setActiveTab(ID_GARAGE);
					}}
				>
					Гараж
				</TabsItem>
				<TabsItem
					selected={activeTab === ID_POSTS}
					onClick={() => {
						setActiveTab(ID_POSTS);
					}}
				>
					Посты
				</TabsItem>
			</Tabs>
			{activeTab === ID_INFO && (
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
			{activeTab === ID_MEMBERS && <Group>Здесь скоро будут участники</Group>}
			{activeTab === ID_GARAGE && (
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
			{activeTab === ID_POSTS && <Group>Здесь скоро будут посты</Group>}
		</Panel>
	);
};
