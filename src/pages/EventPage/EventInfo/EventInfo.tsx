import { Avatar, Caption, Group, Text, Title } from "@vkontakte/vkui";
import React, { useRef, useState } from "react";
import { EventData } from "../api";
import {
	GeolocationControl,
	Map,
	Placemark,
	YMaps,
	ZoomControl,
} from "react-yandex-maps";

import styles from "./EventInfo.module.css";
import { YandexKey } from "../../../constants/yandexKey";

interface Props {
	event: EventData;
}

export const EventInfo: React.FC<Props> = ({ event }) => {
	const myMap = useRef(null);
	const [locationText, setLocationText] = useState("");
	return (
		<div>
			<Group>
				<div className={styles.clubContainer}>
					<div className={styles.clubTextContainer}>
						<Caption level="3" weight="regular">
							Hosted by
						</Caption>
						<Title level="3" weight="semibold">
							{event.club.name}
						</Title>
					</div>
					<Avatar
						size={45}
						style={{ objectFit: "cover" }}
						src={event.club.avatar}
					/>
				</div>
			</Group>
			<Group>
				<div className={styles.container}>
					<Title level="3" weight="regular">
						Описание
					</Title>
					<Text weight="regular" className={styles.text}>
						{event.description}
					</Text>
				</div>
			</Group>
			<Group>
				<div className={styles.container}>
					<Title level="3" weight="regular">
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
						modules={["geocode"]}
						onLoad={(ymaps) => {
							const myGeocoder = ymaps.geocode(
								[event.location.latitude, event.location.longitude],
								{ provider: "yandex#map", kind: "house" }
							);

							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							myGeocoder.then((res: any) => {
								setLocationText(res.geoObjects.get(0).properties.get("text"));
							});
						}}
						defaultState={{
							center: [event.location.latitude, event.location.longitude],
							zoom: 12,
						}}
						width={"100%"}
						height={"300px"}
						options={{
							suppressMapOpenBlock: true,
						}}
						instanceRef={(ref) => {
							// @ts-ignore
							if (ref) myMap.current = ref;
						}}
					>
						<ZoomControl options={{ float: "right" }} />
						<GeolocationControl options={{ float: "left" }} />
						<Placemark
							geometry={[event.location.latitude, event.location.longitude]}
						/>
					</Map>
				</YMaps>
			</Group>
		</div>
	);
};
