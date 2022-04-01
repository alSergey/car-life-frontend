import React from "react";
import { ContentCard } from "@vkontakte/vkui";

interface Props {
	brand: string;
	model: string;
	img: string;
	date: string;
	description: string;
}

export const GarageCard: React.FC<Props> = ({
	brand,
	model,
	img,
	description,
	date,
}) => (
	<ContentCard
		header={`${brand} ${model} ${new Date(date).getFullYear()} г.`}
		text={description}
		image={img}
		maxHeight={150}
	/>
);
