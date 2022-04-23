import React from "react";
import { Div, Text, Title } from "@vkontakte/vkui";
import styles from "./EventHeader.module.css";
import { getPrettyDateTime } from "../../../constants/time";
import { EventData } from "../api";
import { EventButtons } from "./EventButtons";

interface Prop {
	eventData: EventData;
	onButtonClick: () => void;
}

export const EventHeader: React.FC<Prop> = ({ eventData, onButtonClick }) => (
	<div>
		<img src={eventData.avatar} className={styles.img} alt="" />
		<Div>
			<div className={styles.title}>
				<Title level="1" weight="1">
					{eventData.name}
				</Title>
				<Text weight="regular">{getPrettyDateTime(eventData.event_date)}</Text>
			</div>
			<EventButtons
				eventId={eventData.id}
				userStatus={eventData.userStatus}
				onClick={onButtonClick}
			/>
		</Div>
	</div>
);
