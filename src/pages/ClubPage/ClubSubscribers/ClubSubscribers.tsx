import React, { useEffect, useState } from "react";
import { Group } from "@vkontakte/vkui";
import { emptyClubSubscribersList, getClubSubscribersList } from "./api";
import { UserList } from "../../../components/UserList";

interface Props {
	clubId: number;
	onClick: (id: number) => void;
}

export const ClubSubscribers: React.FC<Props> = ({ clubId, onClick }) => {
	const [subscribersList, setSubscribersList] = useState(
		emptyClubSubscribersList
	);

	const handleGetSubscribersList = async (): Promise<void> => {
		try {
			const data = await getClubSubscribersList(clubId);
			setSubscribersList(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		handleGetSubscribersList();
	}, []);

	return (
		<Group>
			<UserList userList={subscribersList} onClick={onClick} />
		</Group>
	);
};
