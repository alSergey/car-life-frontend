import React from "react";
import { Title, Avatar, Gradient } from "@vkontakte/vkui";
import styles from "./UserHeader.module.css";

import { UserData } from "../../../context/userContext";

interface Prop {
	userData: UserData;
}

export const UserHeader: React.FC<Prop> = ({ userData }) => (
	<Gradient className={styles.userContainer}>
		<Avatar className={styles.avatar} size={96} src={userData.avatar} />
		<Title className={styles.userName} level="2" weight="1">
			{userData.surname} {userData.name}
		</Title>
	</Gradient>
);
