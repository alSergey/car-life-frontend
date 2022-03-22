import { Tabs, TabsItem } from "@vkontakte/vkui";
import React from "react";
import { Tab } from "../ClubPage";

interface Props {
	activeTab: string;
	setActive: (tab: Tab) => void;
}

export const ClubBar: React.FC<Props> = ({ activeTab, setActive }) => {
	return (
		<Tabs style={{ fontSize: "10px", lineHeight: "12px" }}>
			<TabsItem
				selected={activeTab === Tab.Events}
				onClick={() => setActive(Tab.Events)}
			>
				События
			</TabsItem>
			<TabsItem
				selected={activeTab === Tab.Garage}
				onClick={() => setActive(Tab.Garage)}
			>
				Гараж
			</TabsItem>
			<TabsItem
				selected={activeTab === Tab.Members}
				onClick={() => setActive(Tab.Members)}
			>
				Участники
			</TabsItem>
			<TabsItem
				selected={activeTab === Tab.Subscribers}
				onClick={() => setActive(Tab.Subscribers)}
			>
				Подписчики
			</TabsItem>
		</Tabs>
	);
};
