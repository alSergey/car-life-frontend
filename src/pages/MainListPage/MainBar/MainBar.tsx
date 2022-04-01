import React from "react";
import { Tabs, TabsItem } from "@vkontakte/vkui";
import { Tab } from "../MainListPage";

interface Props {
	activeTab: Tab;
	setActive: (tab: Tab) => void;
}

export const MainBar: React.FC<Props> = ({ activeTab, setActive }) => {
	return (
		<Tabs>
			<TabsItem
				onClick={() => setActive(Tab.Club)}
				selected={activeTab === Tab.Club}
			>
				Клубы
			</TabsItem>
			<TabsItem
				onClick={() => setActive(Tab.Event)}
				selected={activeTab === Tab.Event}
			>
				События
			</TabsItem>
		</Tabs>
	);
};
