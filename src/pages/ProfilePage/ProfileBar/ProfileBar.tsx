import { Tabs, TabsItem, Text } from "@vkontakte/vkui";
import React from "react";
import { UserTab } from "../ProfilePage";

interface Props {
	activeTab: UserTab;
	setActiveTab: (tab: UserTab) => void;
}

export const ProfileBar: React.FC<Props> = ({ activeTab, setActiveTab }) => {
	return (
		<Tabs>
			<TabsItem
				onClick={() => setActiveTab(UserTab.Info)}
				selected={activeTab === UserTab.Info}
			>
				<Text weight="regular" size={3}>
					О себе
				</Text>
			</TabsItem>
			<TabsItem
				onClick={() => setActiveTab(UserTab.Garage)}
				selected={activeTab === UserTab.Garage}
			>
				<Text weight="regular" size={3}>
					Гараж
				</Text>
			</TabsItem>
			<TabsItem
				onClick={() => setActiveTab(UserTab.Event)}
				selected={activeTab === UserTab.Event}
			>
				<Text weight="regular" size={3}>
					События
				</Text>
			</TabsItem>
			<TabsItem
				onClick={() => setActiveTab(UserTab.Club)}
				selected={activeTab === UserTab.Club}
			>
				<Text weight="regular" size={3}>
					Клубы
				</Text>
			</TabsItem>
		</Tabs>
	);
};
