import React, { useState } from "react";
import { Avatar, Caption, Group, Text, Title } from "@vkontakte/vkui";
import { EventData } from "../api";
import { Map, Placemark, YMaps, ZoomControl } from "react-yandex-maps";

import styles from "./EventInfo.module.css";
import { defaultMapData, YandexKey } from "../../../constants/yandexKey";

interface Props {
	event: EventData;
	onClubClick: (clubId: number) => void;
}

export const EventInfo: React.FC<Props> = ({ event, onClubClick }) => {
	const [locationText, setLocationText] = useState("");

	return (
		<div>
			<Group onClick={() => onClubClick(event.club.id)}>
				<div className={styles.clubContainer}>
					<div className={styles.clubTextContainer}>
						<Caption level="3" weight="3">
							Hosted by
						</Caption>
						<Title level="3" weight="2">
							{event.club.name}
						</Title>
					</div>
					<Avatar className={styles.avatar} size={45} src={event.club.avatar} />
				</div>
			</Group>
			<Group>
				<div className={styles.container}>
					<Title level="3" weight="3">
						Описание
					</Title>
					<Text weight="regular" className={styles.text}>
						{event.description}
					</Text>
				</div>
			</Group>
			<Group>
				<div className={styles.container}>
					<Title level="3" weight="3">
						Место
					</Title>
					<Text
						weight="regular"
						className={styles.text}
						style={{ marginBottom: 15 }}
					>
						{locationText}
					</Text>
				</div>
				<YMaps query={YandexKey}>
					<Map
						height="300px"
						width="100%"
						modules={["geocode"]}
						defaultState={{
							center: [event.location.latitude, event.location.longitude],
							zoom: defaultMapData.zoom,
						}}
						options={{
							suppressMapOpenBlock: true,
						}}
						onLoad={(ymaps) => {
							ymaps
								.geocode([event.location.latitude, event.location.longitude], {
									provider: "yandex#map",
									kind: "house",
								})
								// eslint-disable-next-line @typescript-eslint/no-explicit-any
								.then((res: any) => {
									setLocationText(res.geoObjects.get(0).properties.get("text"));
								});
						}}
					>
						<ZoomControl />
						<Placemark
							geometry={[event.location.latitude, event.location.longitude]}
						/>
					</Map>
				</YMaps>
			</Group>
		</div>
	);
};
