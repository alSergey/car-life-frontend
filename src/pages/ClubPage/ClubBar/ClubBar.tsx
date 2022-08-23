import React from "react";
import { Tabs, TabsItem, Text } from "@vkontakte/vkui";

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
				<Text weight="2">События</Text>
			</TabsItem>
			<TabsItem
				style={{ padding: 0, flexBasis: "initial" }}
				selected={activeTab === ClubTab.Garage}
				onClick={() => setActiveTab(ClubTab.Garage)}
			>
				<Text weight="2">Автопарк</Text>
			</TabsItem>
			<TabsItem
				style={{ padding: 0, flexBasis: "initial" }}
				selected={activeTab === ClubTab.Members}
				onClick={() => setActiveTab(ClubTab.Members)}
			>
				<Text weight="2">Участники</Text>
			</TabsItem>
			<TabsItem
				style={{ padding: 0, flexBasis: "initial" }}
				selected={activeTab === ClubTab.Subscribers}
				onClick={() => setActiveTab(ClubTab.Subscribers)}
			>
				<Text weight="2">Подписчики</Text>
			</TabsItem>
		</Tabs>
	);
};
