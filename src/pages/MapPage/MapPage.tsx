import React, { useState } from "react";
import { Panel } from "@vkontakte/vkui";

import { MapEventsWidget } from "../../widgets/MapEventsWidget";
import { MapBar } from "./MapBar";
import { MapPeopleWidget } from "../../widgets/MapPeopleWidget";

interface Props {
	id: string;
	onEventClick: (eventId: number) => void;
}

export enum MapTab {
	Event = "event",
	People = "people",
}

export const MapPage: React.FC<Props> = ({ id, onEventClick }) => {
	const [activeTab, setActiveTab] = useState(MapTab.Event);

	return (
		<Panel id={id}>
			<MapBar activeTab={activeTab} setActive={setActiveTab} />
			{activeTab === MapTab.Event && (
				<MapEventsWidget onEventClick={onEventClick} />
			)}
			{activeTab === MapTab.People && <MapPeopleWidget />}
		</Panel>
	);
};
