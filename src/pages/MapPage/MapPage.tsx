import React, { useRef, useState } from "react";
import { Panel, PanelHeader } from "@vkontakte/vkui";
import { MapBar, MapTab } from "./MapBar";
import { MapEventsWidget } from "../../widgets/MapEventsWidget";
import { MapPeopleWidget } from "../../widgets/MapPeopleWidget";
import { useRouter } from "@happysanta/router";
import { redirectEventPage } from "../../router";

interface Props {
	id: string;
	pagePrefix: string;
}

export const MapPage: React.FC<Props> = ({ id, pagePrefix }) => {
	const router = useRouter();

	const [activeTab, setActiveTab] = useState(MapTab.Event);
	const panelHref = useRef<HTMLDivElement>(null);

	return (
		<Panel id={id}>
			<PanelHeader getRef={panelHref} separator={false} />
			<MapBar activeTab={activeTab} setActive={setActiveTab} />
			{activeTab === MapTab.Event && (
				<MapEventsWidget
					mapHeight={
						window.innerHeight - 95 - (panelHref.current?.offsetHeight || 0)
					}
					onEventClick={(eventId) =>
						redirectEventPage(router, pagePrefix, { eventId })
					}
				/>
			)}
			{activeTab === MapTab.People && (
				<MapPeopleWidget
					mapHeight={
						window.innerHeight - 95 - (panelHref.current?.offsetHeight || 0)
					}
				/>
			)}
		</Panel>
	);
};
