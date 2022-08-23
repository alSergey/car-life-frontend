import React from "react";
import { Card, Text } from "@vkontakte/vkui";
import { Icon56AddCircleOutline } from "@vkontakte/icons";

interface Props {
	onClick: () => void;
}

export const CreateCarButton: React.FC<Props> = ({ onClick }) => (
	<Card
		onClick={onClick}
		style={{ marginLeft: 12, marginTop: 15, marginRight: 12 }}
	>
		<div
			style={{
				height: 150,
				opacity: 0.5,
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Icon56AddCircleOutline fill={"#808080"} style={{ marginBottom: 8 }} />
			<Text weight="3">Добавить машину</Text>
		</div>
	</Card>
);
