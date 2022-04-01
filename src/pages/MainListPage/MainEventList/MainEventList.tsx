import React, { useEffect, useState } from "react";
import { emptyEventList, getEventList } from "./api";
import { EventList } from "../../../components/EventList";

interface Props {
	searchText: string;
	onClick: (id: number) => void;
}

export const MainEventList: React.FC<Props> = ({ searchText, onClick }) => {
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

	return <EventList eventList={eventList} onClick={onClick} />;
};
