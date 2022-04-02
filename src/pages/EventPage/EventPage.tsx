import React, { useEffect, useState } from "react";
import {
	Button,
	Group,
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Title,
	Text,
} from "@vkontakte/vkui";

import styles from "./EventPage.module.css";
import { emptyEventData, getEvent, newEventMember } from "./api";
import { EventInfo } from "./EventInfo";
import { EventMembers } from "./EventMembers";
import { EventGarage } from "./EventGarage";
import { EventPosts } from "./EventPosts";
import { EventBar } from "./EventBar";
import { getPrettyDateTime } from "../../constants/time";
import {
	isDisabledEventMemberButton,
	isShownEventMemberButton,
} from "./EventPage.utils";

interface Props {
	id: string;
	eventId: number;
	onUserClick: (userId: number) => void;
	onBackClick?: () => void;
}

export enum Tab {
	Info = "info",
	Members = "members",
	Garage = "garage",
	Posts = "posts",
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

	const handleMember = async (): Promise<void> => {
		try {
			await newEventMember(eventId);
			handleGetEventData();
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
					onBackClick && (
						<PanelHeaderBack
							className={styles.backIcon}
							onClick={onBackClick}
						/>
					)
				}
			>
				Событие
			</PanelHeader>
			<img src={eventData.avatar} />
			<Group separator="hide" style={{ marginLeft: 15, marginRight: 15 }}>
				<Title level="1" style={{ marginBottom: 5 }} weight="bold">
					{eventData.name}
				</Title>
				<Text weight="regular" style={{ marginBottom: 10 }}>
					{getPrettyDateTime(eventData.event_date)}
				</Text>
				{isShownEventMemberButton(eventData.userStatus) && (
					<Button
						stretched
						size="m"
						disabled={isDisabledEventMemberButton(eventData.userStatus)}
						onClick={handleMember}
					>
						Участвовать
					</Button>
				)}
			</Group>
			<EventBar activeTab={activeTab} setActive={setActiveTab} />
			{activeTab === Tab.Info && <EventInfo event={eventData} />}
			{activeTab === Tab.Members && (
				<EventMembers eventId={eventData.id} onClick={onUserClick} />
			)}
			{activeTab === Tab.Garage && <EventGarage id={eventData.id} />}
			{activeTab === Tab.Posts && <EventPosts />}
		</Panel>
	);
};
