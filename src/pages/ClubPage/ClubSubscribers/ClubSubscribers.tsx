import React, { useEffect, useState } from "react";
import { Group } from "@vkontakte/vkui";
import { UserList } from "../../../components/UserList";
import { CounterHeader } from "../../../components/CounterHeader";
import { emptyClubSubscribersList, getClubSubscribersList } from "./api";

interface Props {
	clubId: number;
	subscribersCount: number;
	onClick: (id: number) => void;
}

export const ClubSubscribers: React.FC<Props> = ({
	clubId,
	subscribersCount,
	onClick,
}) => {
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
			<CounterHeader
				length={subscribersCount}
				text="Список подписчиков"
				mode="primary"
			/>
			<UserList userList={subscribersList} onClick={onClick} />
		</Group>
	);
};
