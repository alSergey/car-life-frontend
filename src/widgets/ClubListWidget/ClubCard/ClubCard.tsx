import React from "react";
import { ContentCard } from "@vkontakte/vkui";

interface Props {
	title: string;
	img: string;
	onClick: () => void;
}

export const ClubCard: React.FC<Props> = ({ title, img, onClick }) => (
	<ContentCard
		header={title}
		image="https://a.d-cd.net/PQAAAgANmOA-1920.jpg"
		maxHeight={150}
		onClick={onClick}
	/>
);
