import React, { useEffect, useRef, useState } from "react";
import {
	GeolocationControl,
	Map,
	Placemark,
	YMaps,
	ZoomControl,
} from "react-yandex-maps";
import { getEventList } from "./api";
import { emptyEventList } from "./api/api.consts";
import {
	Avatar,
	Group,
	HorizontalCell,
	HorizontalScroll,
} from "@vkontakte/vkui";
import { YandexKey } from "../../constants/yandexKey";
import { getPrettyDate } from "../../constants/time";

interface Props {
	onEventClick: (eventId: number) => void;
	type: "events" | "people";
}

export const MapWidget: React.FC<Props> = ({ onEventClick, type }) => {
	const [events, setEvents] = useState(emptyEventList);
	const [activeEvent, setActiveEvent] = useState(null);
	const myMap = useRef(null);
	const [mapCenter, setMapCenter] = useState([55.76, 37.64]);
	const mapHeight = window.innerHeight - 100;

	const handleGetEventList = async (): Promise<void> => {
		try {
			const data = await getEventList();
			setEvents(data);
			if (events.length !== 0) {
				setMapCenter([events[0].latitude, events[0].longitude]);
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		if (type === "events") {
			handleGetEventList();
		}
	}, []);

	function handleClickEvent(this: any) {
		const eventId = this.id;
		if (eventId === activeEvent) {
			setActiveEvent(null);
			onEventClick(eventId);
			setMapCenter([this.latitude, this.longitude]);
		} else {
			setActiveEvent(eventId);
		}
		const map = myMap.current;
		if (map) {
			// @ts-ignore
			map.action._map.setCenter([this.latitude, this.longitude]);
			// @ts-ignore
			map.action._map.setZoom(13);
		}
	}

	return (
		<div style={{ height: "90%", content: "contents" }}>
			<YMaps query={YandexKey}>
				<Map
					onClick={() => {
						console.log(event);
					}}
					defaultState={{
						center: mapCenter,
						zoom: 11,
					}}
					width={"100%"}
					height={mapHeight}
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
					<Group
						style={{
							position: "absolute",
							bottom: "40px",
							zIndex: 1,
							backgroundColor: "rgba(201,201,201,0.4)",
							width: "100%",
						}}
					>
						<HorizontalScroll
							showArrows
							getScrollToLeft={(i) => i - 120}
							getScrollToRight={(i) => i + 120}
						>
							<div style={{ display: "flex" }}>
								{type === "events" &&
									events.map((e) => {
										return (
											<HorizontalCell
												key={e.id}
												style={{
													backgroundColor:
														activeEvent === e.id
															? "rgba(204, 233, 254, 0.5)"
															: "transparent",
												}}
												header={e.name}
												subtitle={getPrettyDate(e.event_date)}
												size="l"
												onSelect={() => {
													onEventClick(e.id);
												}}
												onClick={handleClickEvent.bind(e)}
											>
												<Avatar
													size={128}
													mode="image"
													style={{
														objectFit: "cover",
													}}
													src={e.avatar}
												/>
												<Placemark
													key={e.id}
													geometry={[e.latitude, e.longitude]}
													onClick={handleClickEvent.bind(e)}
												/>
											</HorizontalCell>
										);
									})}
							</div>
						</HorizontalScroll>
					</Group>
				</Map>
			</YMaps>
		</div>
	);
};