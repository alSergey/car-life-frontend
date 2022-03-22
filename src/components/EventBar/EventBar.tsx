import { Tabs, TabsItem } from "@vkontakte/vkui";
import {
	ID_GARAGE,
	ID_INFO,
	ID_MEMBERS,
	ID_POSTS,
} from "../../constants/config";
import React from "react";

interface Props {
	activeTab: string;
	setActive: (tab: string) => void;
}

export const EventBar: React.FC<Props> = ({ activeTab, setActive }) => {
	return (
		<Tabs style={{ fontSize: "10px", lineHeight: "12px" }}>
			<TabsItem
				selected={activeTab === ID_INFO}
				onClick={() => {
					setActive(ID_INFO);
				}}
			>
				Подробности
			</TabsItem>
			<TabsItem
				selected={activeTab === ID_MEMBERS}
				onClick={() => {
					setActive(ID_MEMBERS);
				}}
			>
				Участники
			</TabsItem>
			<TabsItem
				selected={activeTab === ID_GARAGE}
				onClick={() => {
					setActive(ID_GARAGE);
				}}
			>
				Гараж
			</TabsItem>
			<TabsItem
				selected={activeTab === ID_POSTS}
				onClick={() => {
					setActive(ID_POSTS);
				}}
			>
				Посты
			</TabsItem>
		</Tabs>
	);
};
