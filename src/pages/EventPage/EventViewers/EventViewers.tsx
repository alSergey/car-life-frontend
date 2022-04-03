import React, { useEffect, useState } from "react";
import { Group } from "@vkontakte/vkui";
import { UserList } from "../../../components/UserList";
import { emptyEventViewersList, getEventViewersList } from "./api";

interface Props {
	eventId: number;
	onClick: (id: number) => void;
}

export const EventViewers: React.FC<Props> = ({ eventId, onClick }) => {
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
			<UserList userList={viewersList} onClick={onClick} />
		</Group>
	);
};
