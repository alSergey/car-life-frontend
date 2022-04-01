import { Div, Group, Title, Text } from "@vkontakte/vkui";
import React from "react";
import { InfoData } from "../api/api.types";
import styles from "./ProfileInfo.module.css";

interface Prop {
	info: InfoData | null;
}

export const ProfileInfo: React.FC<Prop> = ({ info }) => {
	return (
		<Div>
			<Group>
				<Title level="3" weight="semibold">
					Мои интересы
				</Title>
				<Text weight="semibold" className={styles.tags}>
					{info?.tags.join(", ")}
				</Text>
			</Group>
			<Group>
				<Title level="3" weight="semibold">
					О себе
				</Title>
				<Text weight="semibold" className={styles.tags}>
					{info?.description}
				</Text>
			</Group>
		</Div>
	);
};
