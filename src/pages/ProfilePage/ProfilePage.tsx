import React, { useContext, useState } from "react";
import { Avatar, Gradient, Panel, Title } from "@vkontakte/vkui";

import styles from "./ProfilePage.module.css";
import { ProfileBar } from "./ProfileBar";
import { ProfileGarage } from "./ProfileGarage";
import { ProfileEvent } from "./ProfileEvent";
import { ProfileClub } from "./ProfileClub";
import { ProfileInfo } from "./ProfileInfo";
import { UserContext } from "../../context/userContext";

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
	const { userState } = useContext(UserContext);

	return (
		<Panel id={id}>
			<Gradient className={styles.userContainer}>
				<Avatar size={96} src={userState.avatar} />
				<Title className={styles.userName} level="2" weight="semibold">
					{userState.surname} {userState.name}
				</Title>
			</Gradient>
			<ProfileBar activeTab={activeTab} setActive={setActiveTab} />
			{activeTab === Tab.Info && <ProfileInfo userData={userState} />}
			{activeTab === Tab.Garage && <ProfileGarage userId={userState.id} />}
			{activeTab === Tab.Event && <ProfileEvent />}
			{activeTab === Tab.Club && <ProfileClub />}
		</Panel>
	);
};
