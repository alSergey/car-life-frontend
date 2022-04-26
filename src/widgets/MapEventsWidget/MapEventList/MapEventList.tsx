import React, { useState } from "react";
import {
	Avatar,
	Group,
	HorizontalCell,
	HorizontalScroll,
} from "@vkontakte/vkui";
import styles from "./MapEventList.module.css";
import { Icon48SwipeUp } from "@vkontakte/icons";
import { getPrettyDate } from "../../../constants/time";
import { ModelsEventCard } from "../../../api/Api";

interface Props {
	eventList: ModelsEventCard[];
	activeEvent: number | null;
	onEventClick: (event: ModelsEventCard) => void;
}

export const MapEventList: React.FC<Props> = ({
	eventList,
	activeEvent,
	onEventClick,
}) => {
	const [opened, setOpened] = useState(true);

	return (
		<Group
			style={{
				position: "absolute",
				bottom: "40px",
				zIndex: 1,
				backgroundColor: "rgba(217,216,216,0.63)",
				width: "100%",
			}}
			header={
				<div className={styles.iconHeader}>
					{opened ? (
						<Icon48SwipeUp
							className={styles.icon}
							onClick={() => setOpened(!opened)}
						/>
					) : (
						<Icon48SwipeUp onClick={() => setOpened(!opened)} />
					)}
				</div>
			}
		>
			{opened && (
				<HorizontalScroll>
					<div className={styles.eventsContainer}>
						{eventList.map((event) => (
							<HorizontalCell
								key={event.id}
								style={{
									backgroundColor:
										activeEvent === event.id
											? "rgba(204, 233, 254, 0.5)"
											: "transparent",
								}}
								size="l"
								header={event.name}
								subtitle={getPrettyDate(event.event_date)}
								onClick={() => onEventClick(event)}
							>
								<Avatar size={128} mode="image" src={event.avatar} />
							</HorizontalCell>
						))}
					</div>
				</HorizontalScroll>
			)}
		</Group>
	);
};
