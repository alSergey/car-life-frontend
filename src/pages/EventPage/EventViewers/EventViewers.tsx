import React, { useEffect, useState } from "react";
import { Group } from "@vkontakte/vkui";
import { UserList } from "../../../components/UserList";
import { CounterHeader } from "../../../components/CounterHeader";
import { emptyEventViewersList, getEventViewersList } from "./api";

interface Props {
	eventId: number;
	viewersCount: number;
	onClick: (id: number) => void;
}

export const EventViewers: React.FC<Props> = ({
	eventId,
	viewersCount,
	onClick,
}) => {
	const [viewersList, setViewersList] = useState(emptyEventViewersList);

	const handleGetViewersList = async (): Promise<void> => {
		try {
			const data = await getEventViewersList(eventId);
			setViewersList(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		handleGetViewersList();
	}, []);

	return (
		<Group>
			<CounterHeader
				length={viewersCount}
				text="Список зрителей"
				mode="primary"
			/>
			<UserList showEmpty userList={viewersList} onClick={onClick} />
		</Group>
	);
};
