import React from "react";
import { ContentCard } from "@vkontakte/vkui";
import { getStaticUrl } from "../../../constants/url";

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
		style={{ height: "230px" }}
		header={title}
		caption={`${subscribers} участников`}
		image={getStaticUrl(img)}
		maxHeight={150}
		onClick={onClick}
	/>
);
