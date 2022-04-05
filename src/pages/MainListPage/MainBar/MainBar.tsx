import React from "react";
import { Tabs, TabsItem } from "@vkontakte/vkui";

export enum MainTab {
	Event = "event",
	Club = "club",
}

interface Props {
	activeTab: MainTab;
	setActiveTab: (tab: MainTab) => void;
}

export const MainBar: React.FC<Props> = ({ activeTab, setActiveTab }) => {
	return (
		<Tabs>
			<TabsItem
				onClick={() => setActiveTab(MainTab.Club)}
				selected={activeTab === MainTab.Club}
			>
				Клубы
			</TabsItem>
			<TabsItem
				onClick={() => setActiveTab(MainTab.Event)}
				selected={activeTab === MainTab.Event}
			>
				События
			</TabsItem>
		</Tabs>
	);
};
