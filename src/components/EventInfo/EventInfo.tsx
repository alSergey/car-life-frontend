import { Avatar, Group, SimpleCell, Text, Title } from "@vkontakte/vkui";
import React from "react";

interface Props {
	description: string;
}

export const EventInfo: React.FC<Props> = ({ description }) => {
	return (
		<Group>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<SimpleCell
					before={
						<Avatar src="https://lowdaily.ru/wp-content/uploads/2018/06/royal-auto-show-DSC04553.jpg" />
					}
				>
					Car Club
				</SimpleCell>
			</div>
			<Group style={{ padding: 15 }}>
				<Text weight="regular">{description}</Text>
				<Title level="3" weight="semibold" style={{ marginBottom: 16 }}>
					Москва
				</Title>
			</Group>
		</Group>
	);
};
