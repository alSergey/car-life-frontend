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
	Text,
} from "@vkontakte/vkui";
import { YandexKey } from "../../constants/yandexKey";
import { getPrettyDate } from "../../constants/time";
import { ModelsEventCard } from "../../api/Api";

interface Props {
	onEventClick: (eventId: number) => void;
	panelHeight?: number;
}

export const MapEventsWidget: React.FC<Props> = ({
	onEventClick,
	panelHeight,
}) => {
	const [events, setEvents] = useState(emptyEventList);
	const [activeEvent, setActiveEvent] = useState<number | null>(null);
	const myMap = useRef(null);
	const [mapCenter, setMapCenter] = useState([55.76, 37.64]);
	const mapHeight = window.innerHeight - 95 - (panelHeight || 0);

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
		handleGetEventList();
	}, []);

	function handleClickEvent(this: ModelsEventCard) {
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
		<div>
			<YMaps query={YandexKey}>
				<Map
					defaultState={{
						center: mapCenter,
						zoom: 11,
					}}
					width={"100%"}
					height={mapHeight}
					options={{
						suppressMapOpenBlock: true,
						mapStateAutoApply: true,
					}}
					instanceRef={(ref) => {
						// @ts-ignore
						if (ref) myMap.current = ref;
					}}
					modules={["geolocation"]}
				>
					<ZoomControl options={{ float: "right" }} />
					<GeolocationControl
						onLoad={(ymaps) => {
							ymaps.geolocation
								.get({
									provider: "yandex",
									mapStateAutoApply: true,
								})
								// eslint-disable-next-line @typescript-eslint/no-explicit-any
								.then(function (result: any) {
									// @ts-ignore
									myMap.current?.geoObjects.add(result.geoObjects);
								});
							setTimeout(() => {
								// @ts-ignore
								myMap.current.action._map.setZoom(11);
							}, 1000);
						}}
						options={{ float: "left", mapStateAutoApply: true }}
						defaultOptions={{ mapStateAutoApply: true }}
						defaultData={{ mapStateAutoApply: true }}
						defaultState={{ zoom: 11 }}
					/>
					<Group
						style={{
							position: "absolute",
							bottom: "40px",
							zIndex: 1,
							backgroundColor: "rgba(217,216,216,0.63)",
							width: "100%",
						}}
					>
						<HorizontalScroll
							showArrows
							getScrollToLeft={(i) => i - 120}
							getScrollToRight={(i) => i + 120}
						>
							<div style={{ display: "flex" }}>
								{events.map((e) => {
									return (
										<HorizontalCell
											key={e.id}
											style={{
												backgroundColor:
													activeEvent === e.id
														? "rgba(204, 233, 254, 0.5)"
														: "transparent",
											}}
											header={
												<Text
													weight="medium"
													style={{ wordBreak: "break-word" }}
												>
													{e.name}
												</Text>
											}
											subtitle={getPrettyDate(e.event_date)}
											size="l"
											onSelect={() => {
												onEventClick(e.id);
											}}
											onClick={handleClickEvent.bind(e)}
										>
											<Avatar
												style={{ objectFit: "contain" }}
												size={128}
												mode="image"
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
