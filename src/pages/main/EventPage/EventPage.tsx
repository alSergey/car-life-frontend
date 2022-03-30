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
import { EventInfo } from "./EventInfo";
import { EventMembers } from "./EventMembers";
import { EventGarage } from "./EventGarage";
import { EventPosts } from "./EventPosts";
import { EventBar } from "./EventBar";
import styles from "./EventPage.module.css";
import { getStaticUrl } from "../../../constants/url";
import { getPrettyDateTime } from "../../../constants/time";

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
			<img src={getStaticUrl(eventData.avatar)} />
			<Group separator="hide" style={{ marginLeft: 15, marginRight: 15 }}>
				<Title level="1" style={{ marginBottom: 5 }} weight="bold">
					{eventData.name}
				</Title>
				<Text weight="regular" style={{ marginBottom: 10 }}>
					{getPrettyDateTime(eventData.event_date)}
				</Text>
				<Button stretched size="m">
					Участвовать
				</Button>
			</Group>
			<EventBar activeTab={activeTab} setActive={setActiveTab} />
			{activeTab === Tab.Info && <EventInfo event={eventData} />}
			{activeTab === Tab.Members && <EventMembers id={eventData.id} />}
			{activeTab === Tab.Garage && <EventGarage id={eventData.id} />}
			{activeTab === Tab.Posts && <EventPosts id={eventData.id} />}
		</Panel>
	);
};
