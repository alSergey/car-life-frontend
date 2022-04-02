import React, { useEffect, useState } from "react";
import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Avatar,
	Div,
	Group,
	Text,
	Button,
} from "@vkontakte/vkui";

import styles from "./ClubPage.module.css";
import { emptyClubData, getClub, newClubMember } from "./api";
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

	const handleMember = async (): Promise<void> => {
		try {
			await newClubMember(clubId);
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
					onBackClick && (
						<PanelHeaderBack
							className={styles.backIcon}
							onClick={onBackClick}
						/>
					)
				}
			>
				{clubData.name}
			</PanelHeader>
			<Div>
				<div className={styles.top}>
					<Group className={styles.topTitle}>
						<Text weight="regular">{clubData.tags.join(", ")}</Text>
						<Text weight="regular" className={styles.desc}>
							{clubData.description}
						</Text>
					</Group>
					<Avatar size={96} src={clubData.avatar} />
				</div>
				<Button
					size="m"
					className={styles.buttonContainer}
					stretched
					onClick={handleMember}
				>
					Участвовать
				</Button>
			</Div>
			<ClubBar activeTab={activeTab} setActive={setActiveTab} />
			{activeTab === Tab.Events && (
				<ClubEvents
					clubId={clubId}
					onClick={(eventId) => onEventClick(eventId)}
				/>
			)}
			{activeTab === Tab.Garage && (
				<ClubGarage clubId={clubId} onClick={(carId) => onCarClick(carId)} />
			)}
			{activeTab === Tab.Members && (
				<ClubMembers
					clubId={clubId}
					onClick={(userId) => onUserClick(userId)}
				/>
			)}
			{activeTab === Tab.Subscribers && <ClubSubscribers />}
		</Panel>
	);
};
