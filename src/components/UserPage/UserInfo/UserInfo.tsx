import React from "react";
import { Div, Group, Title, Text } from "@vkontakte/vkui";
import styles from "./UserInfo.module.css";

import { UserData } from "../../../context/userContext";

interface Prop {
	userData: UserData;
}

export const UserInfo: React.FC<Prop> = ({ userData }) => (
	<Div>
		<Group>
			<Title level="3" weight="semibold">
				Мои интересы
			</Title>
			<Text weight="semibold" className={styles.tags}>
				{userData.tags.join(", ")}
			</Text>
		</Group>
		<Group>
			<Title level="3" weight="semibold">
				О себе
			</Title>
			<Text weight="semibold" className={styles.tags}>
				{userData.description}
			</Text>
		</Group>
	</Div>
);
