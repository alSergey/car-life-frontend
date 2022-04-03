import React from "react";
import { Tabs, TabsItem } from "@vkontakte/vkui";
import { Tab } from "../MapPage";

import styles from "./MainBar.module.css";

interface Props {
	activeTab: Tab;
	setActive: (tab: Tab) => void;
}

export const MapBar: React.FC<Props> = ({ activeTab, setActive }) => (
	<Tabs mode="buttons" className={styles.tabs}>
		<TabsItem
			selected={activeTab === Tab.Event}
			onClick={() => setActive(Tab.Event)}
		>
			Карта клубных событий
		</TabsItem>
		<TabsItem
			selected={activeTab === Tab.People}
			onClick={() => setActive(Tab.People)}
		>
			Карта мини-встреч
		</TabsItem>
	</Tabs>
);
