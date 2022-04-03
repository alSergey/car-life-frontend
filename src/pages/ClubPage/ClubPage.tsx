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
import {
	isDisabledClubMemberButton,
	isShownClubMemberButton,
} from "./ClubPage.utils";
import { getClubPageQuery } from "../../router";

interface Props {
	id: string;
	onEventClick: (eventId: number) => void;
	onCarClick: (carId: number) => void;
	onUserClick: (userId: number) => void;
	onBackClick?: () => void;
}

export enum ClubTab {
	Events = "events",
	Garage = "garage",
	Members = "members",
	Subscribers = "subscribers",
}

export const ClubPage: React.FC<Props> = ({
	id,
	onBackClick,
	onUserClick,
	onCarClick,
	onEventClick,
}) => {
	const { clubId } = getClubPageQuery();

	const [activeTab, setActiveTab] = useState(ClubTab.Events);
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
			await handleGetClubData();
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
				{isShownClubMemberButton(clubData.userStatus) && (
					<Button
						size="m"
						stretched
						className={styles.buttonContainer}
						disabled={isDisabledClubMemberButton(clubData.userStatus)}
						onClick={handleMember}
					>
						Участвовать
					</Button>
				)}
			</Div>
			<ClubBar activeTab={activeTab} setActiveTab={setActiveTab} />
			{activeTab === ClubTab.Events && (
				<ClubEvents
					clubId={clubId}
					onClick={(eventId) => onEventClick(eventId)}
				/>
			)}
			{activeTab === ClubTab.Garage && (
				<ClubGarage clubId={clubId} onClick={(carId) => onCarClick(carId)} />
			)}
			{activeTab === ClubTab.Members && (
				<ClubMembers
					clubId={clubId}
					userStatus={clubData.userStatus}
					onClick={(userId) => onUserClick(userId)}
				/>
			)}
			{activeTab === ClubTab.Subscribers && <ClubSubscribers />}
		</Panel>
	);
};
