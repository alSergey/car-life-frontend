import React from "react";
import { Tabs, TabsItem } from "@vkontakte/vkui";

export enum ClubTab {
	Events = "events",
	Garage = "garage",
	Members = "members",
	Subscribers = "subscribers",
}

interface Props {
	activeTab: ClubTab;
	setActiveTab: (tab: ClubTab) => void;
}

export const ClubBar: React.FC<Props> = ({ activeTab, setActiveTab }) => {
	return (
		<Tabs>
			<TabsItem
				style={{ padding: 0, flexBasis: "initial" }}
				selected={activeTab === ClubTab.Events}
				onClick={() => setActiveTab(ClubTab.Events)}
			>
				События
			</TabsItem>
			<TabsItem
				style={{ padding: 0, flexBasis: "initial" }}
				selected={activeTab === ClubTab.Garage}
				onClick={() => setActiveTab(ClubTab.Garage)}
			>
				Гараж
			</TabsItem>
			<TabsItem
				style={{ padding: 0, flexBasis: "initial" }}
				selected={activeTab === ClubTab.Members}
				onClick={() => setActiveTab(ClubTab.Members)}
			>
				Участники
			</TabsItem>
			<TabsItem
				style={{ padding: 0, flexBasis: "initial" }}
				selected={activeTab === ClubTab.Subscribers}
				onClick={() => setActiveTab(ClubTab.Subscribers)}
			>
				Подписчик
			</TabsItem>
		</Tabs>
	);
};
