import React, { useState } from "react";
import { Panel, PanelHeader, Search, PanelHeaderButton } from "@vkontakte/vkui";
import { Icon28AddOutline } from "@vkontakte/icons";

import styles from "./MainListPage.module.css";
import { MainBar } from "./MainBar";
import { MainEventList } from "./MainEventList";
import { MainClubList } from "./MainClubList";

interface Props {
	id: string;
	onEventCreateClick: () => void;
	onEventClick: (eventId: number) => void;
	onClubCreateClick: () => void;
	onClubClick: (clubId: number) => void;
}

export enum Tab {
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
			<MainBar activeTab={activeTab} setActive={setActiveTab} />
			<Search
				value={searchText}
				after={null}
				onChange={({ target: { value } }) => setSearchText(value)}
			/>
			{activeTab === Tab.Event && (
				<div className={styles.list}>
					<MainEventList
						searchText={searchText}
						onClick={(eventId) => onEventClick(eventId)}
					/>
				</div>
			)}
			{activeTab === Tab.Club && (
				<div className={styles.list}>
					<MainClubList
						searchText={searchText}
						onClick={(clubId) => onClubClick(clubId)}
					/>
				</div>
			)}
		</Panel>
	);
};
