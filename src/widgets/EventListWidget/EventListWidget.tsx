import React, { useEffect, useState } from "react";
import { CardGrid, Footer } from "@vkontakte/vkui";
import { EventCard } from "./EventCard";
import { emptyEventList, getEventList } from "./api";

interface Props {
	searchText: string;
	onClick: (id: number) => void;
}

export const EventListWidget: React.FC<Props> = ({ searchText, onClick }) => {
	const [eventList, setEventList] = useState(emptyEventList);

	const handleGetEventList = async (): Promise<void> => {
		try {
			const data = await getEventList(searchText);
			setEventList(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		handleGetEventList();
	}, [searchText]);

	return (
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
};
