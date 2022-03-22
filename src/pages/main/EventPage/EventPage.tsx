import {
	Button,
	Div,
	Group,
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Title,
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
