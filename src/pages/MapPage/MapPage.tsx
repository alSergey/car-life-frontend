import React, { useState } from "react";
import { Panel } from "@vkontakte/vkui";

import { MapWidget } from "../../widgets/MapWidget";
import { MapBar } from "./MapBar";

interface Props {
	id: string;
	onEventClick: (eventId: number) => void;
}

export enum Tab {
	Event = "event",
	People = "people",
}

export const MapPage: React.FC<Props> = ({ id, onEventClick }) => {
	const [activeTab, setActiveTab] = useState(Tab.Event);

	return (
		<Panel id={id}>
			<MapBar activeTab={activeTab} setActive={setActiveTab} />
			{activeTab === Tab.Event && (
				<MapWidget type="events" onEventClick={onEventClick} />
			)}
			{activeTab === Tab.People && (
				<MapWidget onEventClick={onEventClick} type="people" />
			)}
		</Panel>
	);
};
