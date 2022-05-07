import React, { ReactNode } from "react";
import { CardGrid, CardScroll, Footer } from "@vkontakte/vkui";
import { EventCard } from "./EventCard";

interface EventInfo {
	id: number;
	name: string;
	avatar: string;
	event_date: string;
}

interface Props {
	eventList: EventInfo[];
	scrollType?: "vertical" | "horizontal";
	onClick: (id: number) => void;
}

export const EventList: React.FC<Props> = ({
	eventList,
	scrollType,
	onClick,
}) => {
	const getCardList = (): ReactNode =>
		eventList.map(({ id, name, event_date, avatar }) => (
			<EventCard
				key={id}
				title={name}
				date={event_date}
				img={avatar}
				onClick={() => onClick(id)}
			/>
		));

	return (
		<div style={{ width: "100%" }}>
			{scrollType === "horizontal" ? (
				<CardScroll size="m">{getCardList()}</CardScroll>
			) : (
				<CardGrid size="l">{getCardList()}</CardGrid>
			)}
			{eventList.length === 0 && <Footer>Ничего не найдено</Footer>}
		</div>
	);
};
