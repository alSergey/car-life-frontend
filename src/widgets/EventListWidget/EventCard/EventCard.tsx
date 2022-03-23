import React from "react";
import { ContentCard } from "@vkontakte/vkui";
import { getStaticUrl } from "../../../constants/url";

interface Props {
	title: string;
	date: string;
	img: string;
	onClick: () => void;
}

export const EventCard: React.FC<Props> = ({ title, date, img, onClick }) => (
	<ContentCard
		header={title}
		image={getStaticUrl(img)}
		caption={new Date(date).toLocaleString()}
		maxHeight={150}
		onClick={onClick}
	/>
);
