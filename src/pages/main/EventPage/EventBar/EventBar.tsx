import { Tabs, TabsItem } from "@vkontakte/vkui";
import React from "react";
import { Tab } from "../EventPage";

interface Props {
	activeTab: string;
	setActive: (tab: Tab) => void;
}

export const EventBar: React.FC<Props> = ({ activeTab, setActive }) => {
	return (
		<Tabs style={{ fontSize: "10px", lineHeight: "12px" }}>
			<TabsItem
				selected={activeTab === Tab.Info}
				onClick={() => setActive(Tab.Info)}
			>
				Подробности
			</TabsItem>
			<TabsItem
				selected={activeTab === Tab.Members}
				onClick={() => setActive(Tab.Members)}
			>
				Участники
			</TabsItem>
			<TabsItem
				selected={activeTab === Tab.Garage}
				onClick={() => setActive(Tab.Garage)}
			>
				Гараж
			</TabsItem>
			<TabsItem
				selected={activeTab === Tab.Posts}
				onClick={() => setActive(Tab.Posts)}
			>
				Посты
			</TabsItem>
		</Tabs>
	);
};
