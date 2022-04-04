import React from "react";
import { Tabs, TabsItem } from "@vkontakte/vkui";
import { UserTab } from "../ProfilePage";

interface Props {
	activeTab: UserTab;
	setActiveTab: (tab: UserTab) => void;
}

export const ProfileBar: React.FC<Props> = ({ activeTab, setActiveTab }) => {
	return (
		<Tabs>
			<TabsItem
				style={{ padding: 0, flexBasis: "initial" }}
				selected={activeTab === UserTab.Info}
				onClick={() => setActiveTab(UserTab.Info)}
			>
				О себе
			</TabsItem>
			<TabsItem
				style={{ padding: 0, flexBasis: "initial" }}
				selected={activeTab === UserTab.Garage}
				onClick={() => setActiveTab(UserTab.Garage)}
			>
				Гараж
			</TabsItem>
			<TabsItem
				style={{ padding: 0, flexBasis: "initial" }}
				selected={activeTab === UserTab.Event}
				onClick={() => setActiveTab(UserTab.Event)}
			>
				События
			</TabsItem>
			<TabsItem
				style={{ padding: 0, flexBasis: "initial" }}
				selected={activeTab === UserTab.Club}
				onClick={() => setActiveTab(UserTab.Club)}
			>
				Клубы
			</TabsItem>
		</Tabs>
	);
};
