import { Tabs, TabsItem } from "@vkontakte/vkui";
import React from "react";
import { Tab } from "../EventPage";

interface Props {
	activeTab: string;
	setActive: (tab: Tab) => void;
}

export const EventBar: React.FC<Props> = ({ activeTab, setActive }) => {
	return (
		<Tabs>
			<TabsItem
				style={{ padding: 0, flexBasis: "initial" }}
				selected={activeTab === Tab.Info}
				onClick={() => setActive(Tab.Info)}
			>
				Подробности
			</TabsItem>
			<TabsItem
				style={{ padding: 0, flexBasis: "initial" }}
				selected={activeTab === Tab.Posts}
				onClick={() => setActive(Tab.Posts)}
			>
				Посты
			</TabsItem>
			<TabsItem
				style={{ padding: 0, flexBasis: "initial" }}
				selected={activeTab === Tab.Members}
				onClick={() => setActive(Tab.Members)}
			>
				Участники
			</TabsItem>
			<TabsItem
				style={{ padding: 0, flexBasis: "initial" }}
				selected={activeTab === Tab.Viewers}
				onClick={() => setActive(Tab.Viewers)}
			>
				Зрители
			</TabsItem>
		</Tabs>
	);
};
