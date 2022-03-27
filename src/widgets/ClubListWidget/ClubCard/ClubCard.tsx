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
		header={title}
		caption={`${subscribers} участников`}
		image={img}
		maxHeight={150}
		onClick={onClick}
	/>
);
