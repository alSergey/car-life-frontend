import React from "react";
import { Tabs, TabsItem } from "@vkontakte/vkui";
import styles from "./MainBar.module.css";

export enum MapTab {
	Event = "event",
	People = "people",
}

interface Props {
	activeTab: MapTab;
	setActive: (tab: MapTab) => void;
}

export const MapBar: React.FC<Props> = ({ activeTab, setActive }) => (
	<Tabs mode="secondary" className={styles.tabs}>
		<TabsItem
			selected={activeTab === MapTab.Event}
			onClick={() => setActive(MapTab.Event)}
		>
			Карта клубных событий
		</TabsItem>
		<TabsItem
			selected={activeTab === MapTab.People}
			onClick={() => setActive(MapTab.People)}
		>
			Карта мини-встреч
		</TabsItem>
	</Tabs>
);
