import { Tabs, TabsItem, Text } from "@vkontakte/vkui";
import React from "react";
import { Tab } from "../ProfilePage";

interface Props {
	activeTab: string;
	setActive: (tab: Tab) => void;
}

export const ProfileBar: React.FC<Props> = ({ activeTab, setActive }) => {
	return (
		<Tabs>
			<TabsItem
				onClick={() => setActive(Tab.Info)}
				selected={activeTab === Tab.Info}
			>
				<Text weight="regular" size={3}>
					О себе
				</Text>
			</TabsItem>
			<TabsItem
				onClick={() => setActive(Tab.Garage)}
				selected={activeTab === Tab.Garage}
			>
				<Text weight="regular" size={3}>
					Гараж
				</Text>
			</TabsItem>
			<TabsItem
				onClick={() => setActive(Tab.Event)}
				selected={activeTab === Tab.Event}
			>
				<Text weight="regular" size={3}>
					События
				</Text>
			</TabsItem>
			<TabsItem
				onClick={() => setActive(Tab.Club)}
				selected={activeTab === Tab.Club}
			>
				<Text weight="regular" size={3}>
					Клубы
				</Text>
			</TabsItem>
		</Tabs>
	);
};
