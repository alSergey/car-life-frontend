import React from "react";
import { ContentCard } from "@vkontakte/vkui";

interface Props {
	title: string;
	img: string;
	subscribers: number;
	onClick: () => void;
}

export const ClubCard: React.FC<Props> = ({
	title,
	img,
	subscribers,
	onClick,
}) => (
	<ContentCard
		style={{ marginBottom: 7 }}
		header={title}
		caption={`${subscribers} участников`}
		src={img}
		height="150px"
		onClick={onClick}
	/>
);
