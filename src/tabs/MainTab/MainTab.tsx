import { View } from "@vkontakte/vkui";
import React, { useState } from "react";
import { EventListPage } from "../../pages/EventListPage";
import { EventPage } from "../../pages/EventPage/EventPage";

interface Props {
	id: string;
}

export const MainTab: React.FC<Props> = ({ id }) => {
	const [activePanel, setActivePanel] = useState("panel1.1");
	const [eventId, setEventId] = useState(0);

	return (
		<View activePanel={activePanel} id={id}>
			<EventListPage
				id="panel1.1"
				onClick={(panelId) => {
					setEventId(panelId);
					setActivePanel("panel1.2");
				}}
			/>
			<EventPage
				id="panel1.2"
				eventPage={eventId}
				onClick={() => setActivePanel("panel1.1")}
			/>
		</View>
	);
};
