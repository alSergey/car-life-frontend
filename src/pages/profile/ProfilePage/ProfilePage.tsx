import React, { useEffect, useState } from "react";
import { Avatar, Gradient, Panel, Title } from "@vkontakte/vkui";
import styles from "./ProfilePage.module.css";
import { emptyUserData, getUserInfo } from "./api";
import { ProfileBar } from "./ProfileBar";
import { ProfileGarage } from "./ProfileGarage";
import { ProfileEvent } from "./ProfileEvent";
import { ProfileClub } from "./ProfileClub";
import { ProfileInfo } from "./ProfileInfo";

interface Props {
	id: string;
}

export enum Tab {
	Info = "info",
	Garage = "garage",
	Club = "club",
	Event = "event",
}

export const ProfilePage: React.FC<Props> = ({ id }) => {
	const [activeTab, setActiveTab] = useState(Tab.Info);
	const [userData, setUserData] = useState(emptyUserData);

	const handleGetUserData = async (): Promise<void> => {
		try {
			const data = await getUserInfo();
			setUserData(data);
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		handleGetUserData();
	}, []);

	return (
		<Panel id={id}>
			<Gradient className={styles.userContainer}>
				<Avatar size={96} src={userData.avatar} />
				<Title
					style={{ marginBottom: 8, marginTop: 20 }}
					level="2"
					weight="semibold"
				>
					{userData.surname} {userData.name}
				</Title>
			</Gradient>
			<ProfileBar activeTab={activeTab} setActive={setActiveTab} />
			{activeTab === Tab.Info && <ProfileInfo info={userData.info} />}
			{activeTab === Tab.Garage && (
				<ProfileGarage garageList={userData.garageList} />
			)}
			{activeTab === Tab.Event && <ProfileEvent />}
			{activeTab === Tab.Club && <ProfileClub />}
		</Panel>
	);
};
