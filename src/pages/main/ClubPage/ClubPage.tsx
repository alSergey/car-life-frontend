import {
	Avatar,
	Div,
	Group,
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Title,
	Text,
} from "@vkontakte/vkui";
import React, { useEffect, useState } from "react";

import styles from "./ClubPage.module.css";
import { emptyClubData, getClub } from "./api";
import { ClubBar } from "./ClubBar";
import { ClubEvents } from "./ClubEvents";
import { ClubGarage } from "./ClubGarage";
import { ClubMembers } from "./ClubMembers";
import { ClubSubscribers } from "./ClubSubscribers";

interface Props {
	id: string;
	clubId: number;
	onBackClick: () => void;
}

export enum Tab {
	Events = "events",
	Garage = "garage",
	Members = "members",
	Subscribers = "subscribers",
}

export const ClubPage: React.FC<Props> = ({ id, clubId, onBackClick }) => {
	const [activeTab, setActiveTab] = useState(Tab.Events);
	const [clubData, setClubData] = useState(emptyClubData);

	const handleGetClubData = async (): Promise<void> => {
		try {
			const data = await getClub(clubId);
			setClubData(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		handleGetClubData();
	}, []);

	return (
		<Panel id={id}>
			<PanelHeader
				left={
					<PanelHeaderBack className={styles.backIcon} onClick={onBackClick} />
				}
			>
				Клуб
			</PanelHeader>
			<Div className={styles.top}>
				<Group className={styles.topTitle}>
					<Title level="3" weight="semibold">
						{clubData.name}
					</Title>
					<Text weight="regular" style={{ color: "var(--text_secondary)" }}>
						{clubData.tags.join(", ")}
					</Text>
					<Text weight="regular" style={{ color: "var(--text_secondary)" }}>
						{clubData.description}
					</Text>
				</Group>
				<Avatar size={96} src={clubData.avatar} />
			</Div>
			<ClubBar activeTab={activeTab} setActive={setActiveTab} />
			{activeTab === Tab.Events && <ClubEvents />}
			{activeTab === Tab.Garage && <ClubGarage />}
			{activeTab === Tab.Members && <ClubMembers />}
			{activeTab === Tab.Subscribers && <ClubSubscribers />}
		</Panel>
	);
};
