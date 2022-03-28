import { View } from "@vkontakte/vkui";
import React, { useState } from "react";
import { MapWidget } from "../../widgets/MapWidget";

interface Props {
	id: string;
}

enum Pages {
	EventsMap = "EventsMap",
	PeopleMap = "PeopleMap",
}

export const MapTab: React.FC<Props> = ({ id }) => {
	const [activePanel, setActivePanel] = useState(Pages.EventsMap);

	return (
		<View activePanel={activePanel} id={id}>
			<MapWidget id={Pages.EventsMap} />
		</View>
	);
};
