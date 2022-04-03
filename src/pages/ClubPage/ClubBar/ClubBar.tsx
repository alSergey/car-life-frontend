import React from "react";
import { Tabs, TabsItem } from "@vkontakte/vkui";
import { Tab } from "../ClubPage";

interface Props {
	activeTab: Tab;
	setActive: (tab: Tab) => void;
}

export const ClubBar: React.FC<Props> = ({ activeTab, setActive }) => {
	return (
		<Tabs>
			<TabsItem
				style={{ padding: 0, flexBasis: "initial" }}
				selected={activeTab === Tab.Events}
				onClick={() => setActive(Tab.Events)}
			>
				События
			</TabsItem>
			<TabsItem
				style={{ padding: 0, flexBasis: "initial" }}
				selected={activeTab === Tab.Garage}
				onClick={() => setActive(Tab.Garage)}
			>
				Гараж
			</TabsItem>
			<TabsItem
				style={{ padding: 0, flexBasis: "initial" }}
				selected={activeTab === Tab.Members}
				onClick={() => setActive(Tab.Members)}
			>
				Участники
			</TabsItem>
			<TabsItem
				style={{ padding: 0, flexBasis: "initial" }}
				selected={activeTab === Tab.Subscribers}
				onClick={() => setActive(Tab.Subscribers)}
			>
				Подписчик
			</TabsItem>
		</Tabs>
	);
};
