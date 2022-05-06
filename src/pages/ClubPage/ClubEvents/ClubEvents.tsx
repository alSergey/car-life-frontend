import React, { useEffect, useState } from "react";
import { Group } from "@vkontakte/vkui";
import { EventList } from "../../../components/EventList";
import { emptyClubEventList, getClubEventList } from "./api";
import { AddButton } from "../../../components/AddButton";

interface Props {
	clubId: number;
	userStatus: string;
	onClick: (id: number) => void;
	onCreateClick: () => void;
}

export const ClubEvents: React.FC<Props> = ({
	clubId,
	userStatus,
	onClick,
	onCreateClick,
}) => {
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
			{userStatus === "admin" && <AddButton onClick={onCreateClick} />}
		</Group>
	);
};
