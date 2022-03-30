import React from "react";
import { ContentCard } from "@vkontakte/vkui";
import { getStaticUrl } from "../../../constants/url";
import { getPrettyDateTime } from "../../../constants/time";

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
		caption={getPrettyDateTime(date)}
		maxHeight={150}
		onClick={onClick}
	/>
);
