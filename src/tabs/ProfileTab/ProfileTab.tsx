import { View } from "@vkontakte/vkui";
import React, { useState } from "react";
import { ProfilePage } from "../../pages/ProfilePage";
import { ClubPage } from "../../pages/ClubPage";
import { EventPage } from "../../pages/EventPage";

interface Props {
	id: string;
}

enum Pages {
	Profile = "profile",
	Club = "club",
	Event = "event",
}

export const ProfileTab: React.FC<Props> = ({ id }) => {
	const [activePanel, setActivePanel] = useState(Pages.Profile);
	const [eventId, setEventId] = useState(0);
	const [clubId, setClubId] = useState(0);

	return (
		<View activePanel={activePanel} id={id}>
			<ProfilePage
				id={Pages.Profile}
				onEventClick={(clickEventId) => {
					setEventId(clickEventId);
					setActivePanel(Pages.Event);
				}}
				onClubClick={(clickClubId) => {
					setClubId(clickClubId);
					setActivePanel(Pages.Club);
				}}
				// TODO: реализовать
				onCarClick={() => true}
				onCreateCarClick={() => true}
			/>
			<ClubPage
				id={Pages.Club}
				clubId={clubId}
				onBackClick={() => setActivePanel(Pages.Profile)}
				onEventClick={(clickEventId) => {
					setEventId(clickEventId);
					setActivePanel(Pages.Event);
				}}
				// TODO: реализовать
				onCarClick={() => true}
				onUserClick={() => true}
			/>
			<EventPage
				id={Pages.Event}
				eventId={eventId}
				// TODO: реализовать
				onUserClick={() => true}
				onBackClick={() => setActivePanel(Pages.Profile)}
			/>
		</View>
	);
};
