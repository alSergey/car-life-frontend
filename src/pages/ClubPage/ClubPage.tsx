import React, { useEffect, useState } from "react";
import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Avatar,
	Div,
	Text,
} from "@vkontakte/vkui";

import styles from "./ClubPage.module.css";
import { emptyClubData, getClub } from "./api";
import { ClubButtons } from "./ClubButtons";
import { ClubBar } from "./ClubBar";
import { ClubEvents } from "./ClubEvents";
import { ClubGarage } from "./ClubGarage";
import { ClubMembers } from "./ClubMembers";
import { ClubSubscribers } from "./ClubSubscribers";

interface Props {
	id: string;
	clubId: number;
	onEventClick: (eventId: number) => void;
	onCarClick: (carId: number) => void;
	onUserClick: (userId: number) => void;
	onBackClick?: () => void;
}

export enum Tab {
	Events = "events",
	Garage = "garage",
	Members = "members",
	Subscribers = "subscribers",
}

export const ClubPage: React.FC<Props> = ({
	id,
	clubId,
	onBackClick,
	onUserClick,
	onCarClick,
	onEventClick,
}) => {
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
				left={onBackClick && <PanelHeaderBack onClick={onBackClick} />}
			>
				{clubData.name}
			</PanelHeader>
			<Div>
				<div className={styles.top}>
					<div>
						<Text weight="regular">{clubData.tags.join(", ")}</Text>
						<Text weight="regular" className={styles.desc}>
							{clubData.description}
						</Text>
					</div>
					<Avatar size={96} src={clubData.avatar} />
				</div>
				<ClubButtons
					clubId={clubId}
					userStatus={clubData.userStatus}
					onClick={handleGetClubData}
				/>
			</Div>
			<ClubBar activeTab={activeTab} setActive={setActiveTab} />
			{activeTab === Tab.Events && (
				<ClubEvents clubId={clubId} onClick={onEventClick} />
			)}
			{activeTab === Tab.Garage && (
				<ClubGarage clubId={clubId} onClick={onCarClick} />
			)}
			{activeTab === Tab.Members && (
				<ClubMembers
					clubId={clubId}
					userStatus={clubData.userStatus}
					onClick={onUserClick}
				/>
			)}
			{activeTab === Tab.Subscribers && (
				<ClubSubscribers clubId={clubId} onClick={onUserClick} />
			)}
		</Panel>
	);
};
