import React, { Fragment, ReactNode, useEffect, useState } from "react";
import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	PanelHeaderButton,
} from "@vkontakte/vkui";
import { Icon28MoreHorizontal } from "@vkontakte/icons";

import { EventActionMenu } from "./EventActionMenu";
import { EventHeader } from "./EventHeader";
import { EventBar, EventTab } from "./EventBar";
import { EventInfo } from "./EventInfo";
import { EventMembers } from "./EventMembers";
import { EventViewers } from "./EventViewers";
import { EventPosts } from "./EventPosts";
import { getEventPageQuery } from "../../router";
import { emptyEventData, getEvent } from "./api";

interface Props {
	id: string;
	setPopout: (popout: ReactNode | null) => void;
	onBackClick: () => void;
	onUserClick: (userId: number) => void;
	onClubClick: (clubId: number) => void;
}

export const EventPage: React.FC<Props> = ({
	id,
	setPopout,
	onBackClick,
	onUserClick,
	onClubClick,
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

	const openPopout = () => {
		setPopout(
			<EventActionMenu
				eventId={eventId}
				userStatus={eventData.userStatus}
				onClose={() => setPopout(null)}
				onDelete={onBackClick}
			/>
		);
	};

	return (
		<Panel id={id}>
			<PanelHeader
				before={
					<Fragment>
						<PanelHeaderBack onClick={onBackClick} />
						<PanelHeaderButton aria-label="Меню">
							<Icon28MoreHorizontal onClick={openPopout} />
						</PanelHeaderButton>
					</Fragment>
				}
			>
				Событие
			</PanelHeader>
			<EventHeader eventData={eventData} onButtonClick={handleGetEventData} />
			<EventBar activeTab={activeTab} setActiveTab={setActiveTab} />
			{activeTab === EventTab.Info && (
				<EventInfo event={eventData} onClubClick={onClubClick} />
			)}
			{activeTab === EventTab.Posts && (
				<EventPosts
					eventId={eventId}
					setPopout={setPopout}
					userStatus={eventData.userStatus}
					onUserClick={onUserClick}
				/>
			)}
			{activeTab === EventTab.Members && (
				<EventMembers
					eventId={eventId}
					creator={eventData.creator}
					membersCount={eventData.counters.members}
					userStatus={eventData.userStatus}
					onClick={onUserClick}
				/>
			)}
			{activeTab === EventTab.Viewers && (
				<EventViewers
					eventId={eventId}
					viewersCount={eventData.counters.viewers}
					onClick={onUserClick}
				/>
			)}
		</Panel>
	);
};
