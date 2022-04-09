import React, { useEffect, useState } from "react";
import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";

import { EventBar, EventTab } from "./EventBar";
import { EventHeader } from "./EventHeader";
import { EventInfo } from "./EventInfo";
import { EventMembers } from "./EventMembers";
import { EventViewers } from "./EventViewers";
import { EventPosts } from "./EventPosts";
import { getEventPageQuery } from "../../router";
import { emptyEventData, getEvent } from "./api";

interface Props {
	id: string;
	onUserClick: (userId: number) => void;
	onClubClick: (clubId: number) => void;
	onBackClick?: () => void;
}

export const EventPage: React.FC<Props> = ({
	id,
	onUserClick,
	onClubClick,
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
			<EventHeader eventData={eventData} onButtonClick={handleGetEventData} />
			<EventBar activeTab={activeTab} setActiveTab={setActiveTab} />
			{activeTab === EventTab.Info && (
				<EventInfo event={eventData} onClubClick={onClubClick} />
			)}
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
