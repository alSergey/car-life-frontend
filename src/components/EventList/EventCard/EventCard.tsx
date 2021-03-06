import React from "react";
import { ContentCard } from "@vkontakte/vkui";
import { getPrettyDateTime } from "../../../constants/time";

interface Props {
	title: string;
	date: string;
	img: string;
	onClick: () => void;
}

export const EventCard: React.FC<Props> = ({ title, date, img, onClick }) => (
	<ContentCard
		style={{ marginBottom: 7 }}
		header={title}
		caption={getPrettyDateTime(date)}
		src={img}
		height="150px"
		onClick={onClick}
	/>
);
