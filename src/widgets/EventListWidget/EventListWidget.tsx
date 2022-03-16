import React, { useEffect, useState } from "react";
import { CardGrid, Footer } from "@vkontakte/vkui";
import { EventCard } from "../../components/EventCard";
import { apiGetEvents } from "./action";
import { EventData } from "./action/action.types";

interface Props {
	searchText: string;
	onClick: (id: number) => void;
}

const defaultEventList: EventData[] = [];

export const EventListWidget: React.FC<Props> = (props) => {
	const { searchText, onClick } = props;
	const [eventList, setEventList] = useState(defaultEventList);

	const filteredEventList = React.useMemo(
		() => eventList.filter(({ name }) => name.includes(searchText)),
		[eventList, searchText]
	);

	const getEvents = async (): Promise<void> => {
		try {
			const data = await apiGetEvents();
			setEventList(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getEvents();
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
