import { Div, Group, Title, Text } from "@vkontakte/vkui";
import React from "react";
import { UserData } from "../../../context/userContext";
import styles from "./ProfileInfo.module.css";

interface Prop {
	userData: UserData;
}

export const ProfileInfo: React.FC<Prop> = ({ userData }) => {
	return (
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
};
