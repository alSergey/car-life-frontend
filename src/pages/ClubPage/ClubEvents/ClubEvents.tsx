import React, { useEffect, useState } from "react";
import { Group } from "@vkontakte/vkui";
import { EventList } from "../../../components/EventList";
import { emptyClubEventList, getClubEventList } from "./api";

interface Props {
	clubId: number;
	onClick: (id: number) => void;
}

export const ClubEvents: React.FC<Props> = ({ clubId, onClick }) => {
	const [eventList, setEventList] = useState(emptyClubEventList);

	const handleGetEventList = async (): Promise<void> => {
		try {
			const data = await getClubEventList(clubId);
			setEventList(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		handleGetEventList();
	}, []);

	return (
		<Group>
			<EventList eventList={eventList} onClick={onClick} />
		</Group>
	);
};
