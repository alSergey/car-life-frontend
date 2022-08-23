import React from "react";
import { Div, Group, Title, Text, Button } from "@vkontakte/vkui";
import styles from "./UserInfo.module.css";

import { UserData } from "../../../context/userContext";

interface Prop {
	userData: UserData;
	onEditClick?: () => void;
}

export const UserInfo: React.FC<Prop> = ({ userData, onEditClick }) => (
	<Div>
		<Group>
			<Title level="3" weight="1">
				Мои интересы
			</Title>
			<Text weight="3" className={styles.tags}>
				{userData.tags.join(", ")}
			</Text>
		</Group>
		<Group>
			<Title level="3" weight="1">
				О себе
			</Title>
			<Text weight="3" className={styles.tags}>
				{userData.description}
			</Text>
		</Group>
		{onEditClick && (
			<div className={styles.editButton}>
				<Button stretched mode="secondary" size="l" onClick={onEditClick}>
					Редактировать
				</Button>
			</div>
		)}
	</Div>
);
