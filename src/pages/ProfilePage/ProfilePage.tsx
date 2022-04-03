import React, { useContext, useEffect, useState } from "react";
import {
	Avatar,
	Gradient,
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Title,
} from "@vkontakte/vkui";

import styles from "./ProfilePage.module.css";
import { ProfileBar } from "./ProfileBar";
import { ProfileGarage } from "./ProfileGarage";
import { ProfileEvent } from "./ProfileEvent";
import { ProfileClub } from "./ProfileClub";
import { ProfileInfo } from "./ProfileInfo";
import { defaultUserData, UserContext } from "../../context/userContext";
import { getUserData } from "./api";
import { getUserPageQuery } from "../../router";

interface Props {
	id: string;
	onClubClick: (clubId: number) => void;
	onEventClick: (eventId: number) => void;
	onCarClick: (carId: number) => void;
	onCreateCarClick?: () => void;
	onBackClick?: () => void;
}

export enum UserTab {
	Info = "info",
	Garage = "garage",
	Club = "club",
	Event = "event",
}

export const ProfilePage: React.FC<Props> = ({
	id,
	onBackClick,
	onCarClick,
	onCreateCarClick,
	onClubClick,
	onEventClick,
}) => {
	const { userId } = getUserPageQuery();

	const [activeTab, setActiveTab] = useState(UserTab.Info);
	const [userData, setUserData] = useState(defaultUserData);
	const { userState } = useContext(UserContext);

	const handleGetUserData = async (): Promise<void> => {
		if (!userId) {
			setUserData(userState);
			return;
		}

		try {
			const data = await getUserData(userId);
			setUserData(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		handleGetUserData();
	}, []);

	return (
		<Panel id={id}>
			{onBackClick && (
				<PanelHeader
					left={
						<PanelHeaderBack
							className={styles.backIcon}
							onClick={onBackClick}
						/>
					}
				/>
			)}
			<Gradient className={styles.userContainer}>
				<Avatar size={96} src={userData.avatar} />
				<Title className={styles.userName} level="2" weight="semibold">
					{userData.surname} {userData.name}
				</Title>
			</Gradient>
			<ProfileBar activeTab={activeTab} setActiveTab={setActiveTab} />
			{activeTab === UserTab.Info && <ProfileInfo userData={userData} />}
			{activeTab === UserTab.Garage && (
				<ProfileGarage
					userId={userData.id}
					onClick={onCarClick}
					onCreateClick={onCreateCarClick}
				/>
			)}
			{activeTab === UserTab.Event && (
				<ProfileEvent userId={userData.id} onClick={onEventClick} />
			)}
			{activeTab === UserTab.Club && (
				<ProfileClub userId={userData.id} onClick={onClubClick} />
			)}
		</Panel>
	);
};
