import React from "react";
import { Tabs, TabsItem } from "@vkontakte/vkui";

export enum EventTab {
	Info = "info",
	Posts = "posts",
	Members = "members",
	Viewers = "viewers",
}

interface Props {
	activeTab: EventTab;
	setActiveTab: (tab: EventTab) => void;
}

export const EventBar: React.FC<Props> = ({ activeTab, setActiveTab }) => {
	return (
		<Tabs>
			<TabsItem
				style={{ padding: 0, flexBasis: "initial" }}
				selected={activeTab === EventTab.Info}
				onClick={() => setActiveTab(EventTab.Info)}
			>
				Подробности
			</TabsItem>
			<TabsItem
				style={{ padding: 0, flexBasis: "initial" }}
				selected={activeTab === EventTab.Posts}
				onClick={() => setActiveTab(EventTab.Posts)}
			>
				Посты
			</TabsItem>
			<TabsItem
				style={{ padding: 0, flexBasis: "initial" }}
				selected={activeTab === EventTab.Members}
				onClick={() => setActiveTab(EventTab.Members)}
			>
				Участники
			</TabsItem>
			<TabsItem
				style={{ padding: 0, flexBasis: "initial" }}
				selected={activeTab === EventTab.Viewers}
				onClick={() => setActiveTab(EventTab.Viewers)}
			>
				Зрители
			</TabsItem>
		</Tabs>
	);
};
