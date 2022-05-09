import React, { useRef, useState } from "react";
import { Panel, PanelHeader } from "@vkontakte/vkui";
import { MapBar, MapTab } from "./MapBar";
import { MapEventsWidget } from "../../widgets/MapEventsWidget";
import { MapPeopleWidget } from "../../widgets/MapPeopleWidget";

interface Props {
	id: string;
	onEventClick: (eventId: number) => void;
}

export const MapPage: React.FC<Props> = ({ id, onEventClick }) => {
	const [activeTab, setActiveTab] = useState(MapTab.Event);

	return (
		<Panel id={id}>
			<MapBar activeTab={activeTab} setActive={setActiveTab} />
			{activeTab === MapTab.Event && (
				<MapEventsWidget
					mapHeight={window.innerHeight - 95 - 40}
					onEventClick={onEventClick}
				/>
			)}
			{activeTab === MapTab.People && (
				<MapPeopleWidget mapHeight={window.innerHeight - 95 - 40} />
			)}
		</Panel>
	);
};
