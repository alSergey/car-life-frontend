import React, { useState } from "react";
import { Panel, PanelHeader, Search } from "@vkontakte/vkui";
import styles from "./MainListPage.module.css";
import { MainBar, MainTab } from "./MainBar";
import { MainEventList } from "./MainEventList";
import { MainClubList } from "./MainClubList";
import { AddButton } from "../../components/AddButton";

interface Props {
	id: string;
	onEventCreateClick: () => void;
	onEventClick: (eventId: number) => void;
	onClubCreateClick: () => void;
	onClubClick: (clubId: number) => void;
}

export const MainListPage: React.FC<Props> = ({
	id,
	onEventCreateClick,
	onEventClick,
	onClubCreateClick,
	onClubClick,
}) => {
	const [searchText, setSearchText] = useState("");
	const [activeTab, setActiveTab] = useState(MainTab.Club);

	return (
		<Panel id={id}>
			<PanelHeader separator={false}>Главная</PanelHeader>
			<MainBar activeTab={activeTab} setActiveTab={setActiveTab} />
			<Search
				value={searchText}
				after={null}
				onChange={({ target: { value } }) => setSearchText(value)}
			/>
			{activeTab === MainTab.Event && (
				<div className={styles.list}>
					<MainEventList searchText={searchText} onClick={onEventClick} />
				</div>
			)}
			{activeTab === MainTab.Club && (
				<div className={styles.list}>
					<MainClubList searchText={searchText} onClick={onClubClick} />
				</div>
			)}
			<AddButton
				onClick={() => {
					if (activeTab === MainTab.Event) {
						onEventCreateClick();
						return;
					}

					onClubCreateClick();
				}}
			/>
		</Panel>
	);
};
