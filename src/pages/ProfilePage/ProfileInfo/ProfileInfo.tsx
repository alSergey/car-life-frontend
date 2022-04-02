import { Div, Group, Title, Text } from "@vkontakte/vkui";
import React from "react";
import styles from "./ProfileInfo.module.css";

interface Prop {
	tags?: string[];
	description?: string;
}

export const ProfileInfo: React.FC<Prop> = ({ tags, description }) => {
	return (
		<Div>
			<Group>
				<Title level="3" weight="semibold">
					Мои интересы
				</Title>
				<Text weight="semibold" className={styles.tags}>
					{tags?.join(", ")}
				</Text>
			</Group>
			<Group>
				<Title level="3" weight="semibold">
					О себе
				</Title>
				<Text weight="semibold" className={styles.tags}>
					{description}
				</Text>
			</Group>
		</Div>
	);
};
