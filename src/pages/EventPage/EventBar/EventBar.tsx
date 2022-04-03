import { Tabs, TabsItem, Text } from "@vkontakte/vkui";
import React from "react";
import { EventTab } from "../EventPage";

interface Props {
	activeTab: EventTab;
	setActiveTab: (tab: EventTab) => void;
}

export const EventBar: React.FC<Props> = ({ activeTab, setActiveTab }) => {
	return (
		<Tabs>
			<TabsItem
				selected={activeTab === EventTab.Info}
				onClick={() => setActiveTab(EventTab.Info)}
			>
				<Text weight="regular" size={3}>
					Подробности
				</Text>
			</TabsItem>
			<TabsItem
				selected={activeTab === EventTab.Members}
				onClick={() => setActiveTab(EventTab.Members)}
			>
				<Text weight="regular" size={3}>
					Участники
				</Text>
			</TabsItem>
			<TabsItem
				selected={activeTab === EventTab.Posts}
				onClick={() => setActiveTab(EventTab.Posts)}
			>
				<Text weight="regular" size={3}>
					Посты
				</Text>
			</TabsItem>
		</Tabs>
	);
};
