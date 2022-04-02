import {
	Avatar,
	Gradient,
	Group,
	Separator,
	SimpleCell,
	Text,
	Title,
} from "@vkontakte/vkui";
import React, { useRef, useState } from "react";
import { EventData } from "../api";
import {
	GeolocationControl,
	Map,
	Placemark,
	YMaps,
	ZoomControl,
} from "react-yandex-maps";
import { YandexKey } from "../../../constants/yandexKey";

interface Props {
	event: EventData;
}

export const EventInfo: React.FC<Props> = ({ event }) => {
	const myMap = useRef(null);
	const [locationText, setLocationText] = useState("");
	return (
		<Group>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					width: "100%",
					padding: "0 15px 5px",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						marginRight: 10,
					}}
				>
					<Text weight="regular" style={{ fontSize: "12px", marginTop: 1 }}>
						Hosted by
					</Text>
					<Title level="3" weight="semibold">
						{"event.club.name"}
					</Title>
				</div>
				<Avatar
					size={45}
					style={{ objectFit: "cover" }}
					src={
						"https://lowdaily.ru/wp-content/uploads/2018/06/royal-auto-show-DSC04553.jpg"
					}
				/>
			</div>
			<div style={{ padding: "10px 15px 15px" }}>
				<Separator style={{ marginBottom: "15px" }} />
				<Text
					weight="regular"
					style={{ fontSize: "13px", marginLeft: -10, marginBottom: 9 }}
				>
					Описание
				</Text>
				<Text weight="regular">{event.description}</Text>
				<Separator style={{ marginTop: "20px", marginBottom: "20px" }} />
				<Group>
					<Text
						weight="regular"
						style={{ fontSize: "13px", marginLeft: -10, marginBottom: 9 }}
					>
						Место
					</Text>
					<Title level="3" weight="medium" style={{ marginBottom: 16 }}>
						{locationText}
					</Title>
					<YMaps query={YandexKey}>
						<Map
							modules={["geocode"]}
							onLoad={(ymaps) => {
								const myGeocoder = ymaps.geocode(
									[event.location.latitude, event.location.longitude],
									{ provider: "yandex#map", kind: "house" }
								);

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
		</Group>
	);
};
