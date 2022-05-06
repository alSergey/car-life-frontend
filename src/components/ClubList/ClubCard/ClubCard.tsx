import React from "react";
import { ContentCard } from "@vkontakte/vkui";

interface Props {
	title: string;
	img: string;
	members: number;
	subscribers: number;
	onClick: () => void;
}

export const ClubCard: React.FC<Props> = ({
	title,
	img,
	members,
	subscribers,
	onClick,
}) => (
	<ContentCard
		style={{ marginBottom: 7 }}
		header={title}
		caption={`Автолюбители: ${members + subscribers}`}
		src={img}
		height="150px"
		onClick={onClick}
	/>
);
