import React, { useEffect, useState } from "react";
import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Title,
	Text,
	Div,
} from "@vkontakte/vkui";

import styles from "./EventPage.module.css";
import { emptyEventData, getEvent } from "./api";
import { EventBar } from "./EventBar";
import { EventButtons } from "./EventButtons";
import { EventInfo } from "./EventInfo";
import { EventMembers } from "./EventMembers";
import { EventViewers } from "./EventViewers";
import { EventPosts } from "./EventPosts";
import { getPrettyDateTime } from "../../constants/time";

interface Props {
	id: string;
	eventId: number;
	onUserClick: (userId: number) => void;
	onBackClick?: () => void;
}

export enum Tab {
	Info = "info",
	Posts = "posts",
	Members = "members",
	Viewers = "viewers",
}

export const EventPage: React.FC<Props> = ({
	id,
	eventId,
	onUserClick,
	onBackClick,
}) => {
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
				left={onBackClick && <PanelHeaderBack onClick={onBackClick} />}
			>
				Событие
			</PanelHeader>
			<img src={eventData.avatar} className={styles.img} alt="" />
			<Div>
				<div className={styles.title}>
					<Title level="1" weight="bold">
						{eventData.name}
					</Title>
					<Text weight="regular">
						{getPrettyDateTime(eventData.event_date)}
					</Text>
				</div>
				<EventButtons
					eventId={eventId}
					userStatus={eventData.userStatus}
					onClick={handleGetEventData}
				/>
			</Div>
			<EventBar activeTab={activeTab} setActive={setActiveTab} />
			{activeTab === Tab.Info && <EventInfo event={eventData} />}
			{activeTab === Tab.Posts && <EventPosts />}
			{activeTab === Tab.Members && (
				<EventMembers
					eventId={eventId}
					userStatus={eventData.userStatus}
					onClick={onUserClick}
				/>
			)}
			{activeTab === Tab.Viewers && (
				<EventViewers eventId={eventId} onClick={onUserClick} />
			)}
		</Panel>
	);
};
