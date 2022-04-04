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
import { getEventPageQuery } from "../../router";

interface Props {
	id: string;
	onUserClick: (userId: number) => void;
	onBackClick?: () => void;
}

export enum EventTab {
	Info = "info",
	Posts = "posts",
	Members = "members",
	Viewers = "viewers",
}

export const EventPage: React.FC<Props> = ({
	id,
	onUserClick,
	onBackClick,
}) => {
	const { eventId } = getEventPageQuery();

	const [activeTab, setActiveTab] = useState(EventTab.Info);
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
			<EventBar activeTab={activeTab} setActiveTab={setActiveTab} />
			{activeTab === EventTab.Info && <EventInfo event={eventData} />}
			{activeTab === EventTab.Posts && <EventPosts />}
			{activeTab === EventTab.Members && (
				<EventMembers
					eventId={eventId}
					userStatus={eventData.userStatus}
					onClick={onUserClick}
				/>
			)}
			{activeTab === EventTab.Viewers && (
				<EventViewers eventId={eventId} onClick={onUserClick} />
			)}
		</Panel>
	);
};
