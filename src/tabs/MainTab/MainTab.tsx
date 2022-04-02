import { View } from "@vkontakte/vkui";
import React, { useState } from "react";
import { MainListPage } from "../../pages/MainListPage";
import { EventPage } from "../../pages/EventPage";
import { CreateEventPage } from "../../pages/CreateEventPage";
import { CreateClubPage } from "../../pages/CreateClubPage";
import { ClubPage } from "../../pages/ClubPage";

interface Props {
	id: string;
}

enum Pages {
	Main = "main",
	CreateEvent = "createEvent",
	Event = "event",
	CreateClub = "createClub",
	Club = "club",
}

export const MainTab: React.FC<Props> = ({ id }) => {
	const [activePanel, setActivePanel] = useState(Pages.Main);
	const [eventId, setEventId] = useState(0);
	const [clubId, setClubId] = useState(0);

	return (
		<View activePanel={activePanel} id={id}>
			<MainListPage
				id={Pages.Main}
				onEventCreateClick={() => setActivePanel(Pages.CreateEvent)}
				onEventClick={(clickEventId) => {
					setEventId(clickEventId);
					setActivePanel(Pages.Event);
				}}
				onClubCreateClick={() => setActivePanel(Pages.CreateClub)}
				onClubClick={(clickClubId) => {
					setClubId(clickClubId);
					setActivePanel(Pages.Club);
				}}
			/>
			<CreateEventPage
				id={Pages.CreateEvent}
				onBackClick={() => setActivePanel(Pages.Main)}
				onSubmit={(clickEventId) => {
					setEventId(clickEventId);
					setActivePanel(Pages.Event);
				}}
			/>
			<EventPage
				id={Pages.Event}
				eventId={eventId}
				onBackClick={() => setActivePanel(Pages.Main)}
			/>
			<CreateClubPage
				id={Pages.CreateClub}
				onBackClick={() => setActivePanel(Pages.Main)}
				onSubmit={(clickClubId) => {
					setClubId(clickClubId);
					setActivePanel(Pages.Club);
				}}
			/>
			<ClubPage
				id={Pages.Club}
				clubId={clubId}
				onBackClick={() => setActivePanel(Pages.Main)}
				onEventClick={(clickEventId) => {
					setEventId(clickEventId);
					setActivePanel(Pages.Event);
				}}
				onCarClick={() => true}
				onUserClick={() => true}
			/>
		</View>
	);
};
