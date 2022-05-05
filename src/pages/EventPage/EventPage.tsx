import React, { useEffect, useState } from "react";
import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";

import { EventBar, EventTab } from "./EventBar";
import { EventHeader } from "./EventHeader";
import { EventInfo } from "./EventInfo";
import { EventMembers } from "./EventMembers";
import { EventViewers } from "./EventViewers";
import { EventPosts } from "./EventPosts";
import {
	getEventPageQuery,
	redirectClubPage,
	redirectUserPage,
} from "../../router";
import { emptyEventData, getEvent } from "./api";
import { useRouter } from "@happysanta/router";

interface Props {
	id: string;
	pagePrefix: string;
}

export const EventPage: React.FC<Props> = ({ id, pagePrefix }) => {
	const router = useRouter();
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
			<PanelHeader left={<PanelHeaderBack onClick={() => router.popPage()} />}>
				Событие
			</PanelHeader>
			<EventHeader eventData={eventData} onButtonClick={handleGetEventData} />
			<EventBar activeTab={activeTab} setActiveTab={setActiveTab} />
			{activeTab === EventTab.Info && (
				<EventInfo
					event={eventData}
					onClubClick={(clubId) =>
						redirectClubPage(router, pagePrefix, { clubId })
					}
				/>
			)}
			{activeTab === EventTab.Posts && (
				<EventPosts
					eventId={eventId}
					userStatus={eventData.userStatus}
					onUserClick={(userId) =>
						redirectUserPage(router, pagePrefix, { userId })
					}
				/>
			)}
			{activeTab === EventTab.Members && (
				<EventMembers
					eventId={eventId}
					userStatus={eventData.userStatus}
					onClick={(userId) => redirectUserPage(router, pagePrefix, { userId })}
				/>
			)}
			{activeTab === EventTab.Viewers && (
				<EventViewers
					eventId={eventId}
					onClick={(userId) => redirectUserPage(router, pagePrefix, { userId })}
				/>
			)}
		</Panel>
	);
};
