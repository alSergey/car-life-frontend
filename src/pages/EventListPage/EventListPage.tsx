import React, { useState } from "react";
import { Panel, PanelHeader, Search, Tabs, TabsItem } from "@vkontakte/vkui";
import { EventListWidget } from "../../widgets/EventListWidget";

import styles from "./EventListPage.module.css";

interface Props {
	id: string;
	onClick: (id: number) => void;
}

export const EventListPage: React.FC<Props> = ({ id, onClick }) => {
	const [searchText, setSearchText] = useState("");
	const [activeTab, setActiveTab] = useState("event");

	return (
		<Panel id={id}>
			<PanelHeader separator={false}>Главная</PanelHeader>
			<Tabs>
				<TabsItem
					onClick={() => setActiveTab("club")}
					selected={activeTab === "club"}
				>
					Клубы
				</TabsItem>
				<TabsItem
					onClick={() => setActiveTab("event")}
					selected={activeTab === "event"}
				>
					События
				</TabsItem>
			</Tabs>
			<Search
				value={searchText}
				after={null}
				onChange={({ target: { value } }) => {
					setSearchText(value);
				}}
			/>
			{activeTab === "event" && (
				<div className={styles.eventList}>
					<EventListWidget
						searchText={searchText}
						onClick={(eventId) => onClick(eventId)}
					/>
				</div>
			)}
		</Panel>
	);
};
