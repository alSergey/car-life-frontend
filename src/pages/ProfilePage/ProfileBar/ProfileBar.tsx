import { Tabs, TabsItem } from "@vkontakte/vkui";
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
				О себе
			</TabsItem>
			<TabsItem
				onClick={() => setActive(Tab.Garage)}
				selected={activeTab === Tab.Garage}
			>
				Гараж
			</TabsItem>
			<TabsItem
				onClick={() => setActive(Tab.Event)}
				selected={activeTab === Tab.Event}
			>
				События
			</TabsItem>
			<TabsItem
				onClick={() => setActive(Tab.Club)}
				selected={activeTab === Tab.Club}
			>
				Клубы
			</TabsItem>
		</Tabs>
	);
};
