import React from "react";
import { CardGrid, Footer } from "@vkontakte/vkui";
import { EventCard } from "./EventCard";

interface EventInfo {
	id: number;
	name: string;
	avatar: string;
	event_date: string;
}

interface Props {
	eventList: EventInfo[];
	onClick: (id: number) => void;
}

export const EventList: React.FC<Props> = ({ eventList, onClick }) => (
	<div>
		<CardGrid size="l">
			{eventList.map(({ id, name, event_date, avatar }) => (
				<EventCard
					key={id}
					title={name}
					date={event_date}
					img={avatar}
					onClick={() => onClick(id)}
				/>
			))}
		</CardGrid>
		{eventList.length === 0 && <Footer>Ничего не найдено</Footer>}
	</div>
);
