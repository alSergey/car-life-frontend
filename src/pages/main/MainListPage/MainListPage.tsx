import React, { useState } from "react";
import {
	Panel,
	PanelHeader,
	Search,
	Tabs,
	TabsItem,
	PanelHeaderButton,
} from "@vkontakte/vkui";
import { EventListWidget } from "../../../widgets/EventListWidget";
import { Icon28AddOutline } from "@vkontakte/icons";

import styles from "./MainListPage.module.css";
import { ClubListWidget } from "../../../widgets/ClubListWidget";

interface Props {
	id: string;
	onEventCreateClick: () => void;
	onEventClick: (eventId: number) => void;
	onClubCreateClick: () => void;
	onClubClick: (clubId: number) => void;
}

enum Tab {
	Event = "event",
	Club = "club",
}

export const MainListPage: React.FC<Props> = ({
	id,
	onEventCreateClick,
	onEventClick,
	onClubCreateClick,
	onClubClick,
}) => {
	const [searchText, setSearchText] = useState("");
	const [activeTab, setActiveTab] = useState(Tab.Club);

	return (
		<Panel id={id}>
			<PanelHeader
				separator={false}
				left={
					<PanelHeaderButton
						onClick={() => {
							if (activeTab === Tab.Event) {
								onEventCreateClick();
								return;
							}

							onClubCreateClick();
						}}
					>
						<Icon28AddOutline className={styles.addIcon} />
					</PanelHeaderButton>
				}
			>
				Главная
			</PanelHeader>
			<Tabs>
				<TabsItem
					onClick={() => setActiveTab(Tab.Club)}
					selected={activeTab === Tab.Club}
				>
					Клубы
				</TabsItem>
				<TabsItem
					onClick={() => setActiveTab(Tab.Event)}
					selected={activeTab === Tab.Event}
				>
					События
				</TabsItem>
			</Tabs>
			<Search
				value={searchText}
				after={null}
				onChange={({ target: { value } }) => setSearchText(value)}
			/>
			{activeTab === Tab.Event && (
				<div className={styles.list}>
					<EventListWidget
						searchText={searchText}
						onClick={(eventId) => onEventClick(eventId)}
					/>
				</div>
			)}
			{activeTab === Tab.Club && (
				<div className={styles.list}>
					<ClubListWidget
						searchText={searchText}
						onClick={(clubId) => onClubClick(clubId)}
					/>
				</div>
			)}
		</Panel>
	);
};
