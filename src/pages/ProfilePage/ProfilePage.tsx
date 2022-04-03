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

interface Props {
	id: string;
	userId?: number;
	onClubClick: (clubId: number) => void;
	onEventClick: (eventId: number) => void;
	onCarClick: (carId: number) => void;
	onCreateCarClick?: () => void;
	onBackClick?: () => void;
}

export enum Tab {
	Info = "info",
	Garage = "garage",
	Club = "club",
	Event = "event",
}

export const ProfilePage: React.FC<Props> = ({
	id,
	userId,
	onBackClick,
	onCarClick,
	onCreateCarClick,
	onClubClick,
	onEventClick,
}) => {
	const [activeTab, setActiveTab] = useState(Tab.Info);
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
				<PanelHeader left={<PanelHeaderBack onClick={onBackClick} />} />
			)}
			<Gradient className={styles.userContainer}>
				<Avatar size={96} src={userData.avatar} />
				<Title className={styles.userName} level="2" weight="semibold">
					{userData.surname} {userData.name}
				</Title>
			</Gradient>
			<ProfileBar activeTab={activeTab} setActive={setActiveTab} />
			{activeTab === Tab.Info && <ProfileInfo userData={userData} />}
			{activeTab === Tab.Garage && (
				<ProfileGarage
					userId={userData.id}
					onClick={onCarClick}
					onCreateClick={onCreateCarClick}
				/>
			)}
			{activeTab === Tab.Event && (
				<ProfileEvent userId={userData.id} onClick={onEventClick} />
			)}
			{activeTab === Tab.Club && (
				<ProfileClub userId={userData.id} onClick={onClubClick} />
			)}
		</Panel>
	);
};
