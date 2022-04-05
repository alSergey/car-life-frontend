import React from "react";
import { Tabs, TabsItem } from "@vkontakte/vkui";

export enum UserTab {
	Info = "info",
	Garage = "garage",
	Club = "club",
	Event = "event",
}

interface Props {
	activeTab: UserTab;
	setActiveTab: (tab: UserTab) => void;
}

export const UserBar: React.FC<Props> = ({ activeTab, setActiveTab }) => {
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
