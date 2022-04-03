import React from "react";
import { Tabs, TabsItem, Text } from "@vkontakte/vkui";
import { ClubTab } from "../ClubPage";

interface Props {
	activeTab: ClubTab;
	setActiveTab: (tab: ClubTab) => void;
}

export const ClubBar: React.FC<Props> = ({ activeTab, setActiveTab }) => {
	return (
		<Tabs>
			<TabsItem
				selected={activeTab === ClubTab.Events}
				onClick={() => setActiveTab(ClubTab.Events)}
			>
				<Text weight="regular">События</Text>
			</TabsItem>
			<TabsItem
				selected={activeTab === ClubTab.Garage}
				onClick={() => setActiveTab(ClubTab.Garage)}
			>
				<Text weight="regular">Гараж</Text>
			</TabsItem>
			<TabsItem
				selected={activeTab === ClubTab.Members}
				onClick={() => setActiveTab(ClubTab.Members)}
			>
				<Text weight="regular">Участники</Text>
			</TabsItem>
			<TabsItem
				selected={activeTab === ClubTab.Subscribers}
				onClick={() => setActiveTab(ClubTab.Subscribers)}
			>
				<Text weight="regular">Подписчики</Text>
			</TabsItem>
		</Tabs>
	);
};
