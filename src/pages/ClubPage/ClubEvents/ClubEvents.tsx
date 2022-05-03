import React, { useEffect, useState } from "react";
import { Button, Group } from "@vkontakte/vkui";
import { Icon28AddOutline } from "@vkontakte/icons";
import styles from "./ClubEvents.module.css";
import { EventList } from "../../../components/EventList";
import { emptyClubEventList, getClubEventList } from "./api";

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
			{userStatus === "admin" && (
				<Button
					className={styles.addButton}
					size="l"
					style={{ width: 55, height: 55 }}
					mode="secondary"
					before={<Icon28AddOutline width={35} height={35} />}
					onClick={onCreateClick}
				/>
			)}
		</Group>
	);
};
