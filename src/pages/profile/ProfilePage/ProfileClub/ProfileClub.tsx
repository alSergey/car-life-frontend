import { Div, Group, Title } from "@vkontakte/vkui";
import React from "react";

export const ProfileClub: React.FC = () => {
	return (
		<Div>
			<Group>
				<Title level="3" weight="semibold">
					Администратор клуба
				</Title>
			</Group>
			<Group>
				<Title level="3" weight="semibold">
					Участник клуба
				</Title>
			</Group>
		</Div>
	);
};
