import { Panel, Tabs, TabsItem, View } from "@vkontakte/vkui";
import React, { useState } from "react";
import { MapWidget } from "../../widgets/MapWidget";
import { EventPage } from "../../pages/EventPage";

interface Props {
	id: string;
}

enum Pages {
	EventsMap = "EventsMap",
	PeopleMap = "PeopleMap",
	Event = "event",
	Maps = "maps",
}

export const MapTab: React.FC<Props> = ({ id }) => {
	const [activePanel, setActivePanel] = useState(Pages.Maps);
	const [activeTab, setActiveTab] = useState(Pages.EventsMap);
	const [eventOpenId, setEventOpenId] = useState(0);

	return (
		<View activePanel={activePanel} id={id}>
			<Panel id={Pages.Maps}>
				<Tabs
					mode="buttons"
					style={{
						backgroundColor: "transparent",
						display: "flex",
						justifyContent: "center",
					}}
				>
					<TabsItem
						onClick={() => setActiveTab(Pages.EventsMap)}
						selected={activeTab === Pages.EventsMap}
					>
						Карта клубных событий
					</TabsItem>
					<TabsItem
						onClick={() => setActiveTab(Pages.PeopleMap)}
						selected={activeTab === Pages.PeopleMap}
					>
						Карта мини-встреч
					</TabsItem>
				</Tabs>
				{activeTab === Pages.EventsMap && (
					<MapWidget
						type="events"
						onEventClick={(eventId) => {
							setEventOpenId(eventId);
							setActivePanel(Pages.Event);
						}}
					/>
				)}
				{activeTab === Pages.PeopleMap && (
					<MapWidget
						onEventClick={(eventId) => {
							setEventOpenId(eventId);
							setActivePanel(Pages.Event);
						}}
						type="people"
					/>
				)}
			</Panel>
			<EventPage
				id={Pages.Event}
				eventId={eventOpenId}
				onBackClick={() => {
					setActivePanel(Pages.Maps);
					setActiveTab(Pages.EventsMap);
				}}
			/>
		</View>
	);
};
