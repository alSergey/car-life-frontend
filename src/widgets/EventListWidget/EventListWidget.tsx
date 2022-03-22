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

	const filteredEventList = React.useMemo(
		() => eventList.filter(({ name }) => name?.includes(searchText)),
		[eventList, searchText]
	);

	const handleGetEventList = async (): Promise<void> => {
		try {
			const data = await getEventList();
			setEventList(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		handleGetEventList();
	}, []);

	return (
		<div>
			<CardGrid size="l">
				{filteredEventList.map(({ id, name, event_date, avatar }) => (
					<EventCard
						key={id}
						title={name}
						date={event_date}
						img={avatar}
						onClick={() => onClick(id)}
					/>
				))}
			</CardGrid>
			{filteredEventList.length === 0 && <Footer>Ничего не найдено</Footer>}
		</div>
	);
};
