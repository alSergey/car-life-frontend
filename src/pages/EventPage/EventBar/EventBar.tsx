import { Tabs, TabsItem, Text } from "@vkontakte/vkui";
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
				selected={activeTab === Tab.Info}
				onClick={() => setActive(Tab.Info)}
			>
				<Text weight="regular" size={3}>
					Подробности
				</Text>
			</TabsItem>
			<TabsItem
				selected={activeTab === Tab.Members}
				onClick={() => setActive(Tab.Members)}
			>
				<Text weight="regular" size={3}>
					Участники
				</Text>
			</TabsItem>
			<TabsItem
				selected={activeTab === Tab.Posts}
				onClick={() => setActive(Tab.Posts)}
			>
				<Text weight="regular" size={3}>
					Посты
				</Text>
			</TabsItem>
		</Tabs>
	);
};
