import {
	Button,
	Group,
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Title,
	Text,
} from "@vkontakte/vkui";
import React, { useEffect, useState } from "react";
import { emptyEventData, getEvent } from "./api";
import { EventInfo } from "../../../components/EventInfo";
import { EventMembers } from "../../../widgets/EventMembers";
import { EventGarage } from "../../../widgets/EventGarage";
import { EventPosts } from "../../../widgets/EventPosts";
import { EventBar } from "../../../components/EventBar";
import styles from "./EventPage.module.css";

interface Props {
	id: string;
	eventId: number;
	onBackClick: () => void;
}

export enum Tab {
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
			<img
				src="https://klike.net/uploads/posts/2019-05/medium/1559021804_2.jpg"
				alt=""
			/>
			<Group separator="hide" style={{ marginLeft: 15, marginRight: 15 }}>
				<Title level="1" style={{ marginBottom: 5 }} weight="bold">
					{eventData.name}
				</Title>
				<Text weight="regular" style={{ marginBottom: 10 }}>
					{new Date(eventData.event_date).toLocaleString()}
				</Text>
				<Button stretched size="m">
					Участвовать
				</Button>
			</Group>
			<EventBar activeTab={activeTab} setActive={setActiveTab} />
			{activeTab === Tab.Info && (
				<EventInfo description={eventData.description} />
			)}
			{activeTab === Tab.Members && <EventMembers id={eventData.id} />}
			{activeTab === Tab.Garage && <EventGarage id={eventData.id} />}
			{activeTab === Tab.Posts && <EventPosts id={eventData.id} />}
		</Panel>
	);
};
