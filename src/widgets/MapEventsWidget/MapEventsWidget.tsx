import React, { useEffect, useRef, useState } from "react";
import {
	GeolocationControl,
	Map,
	Placemark,
	YMaps,
	ZoomControl,
} from "react-yandex-maps";
import { defaultMapData, YandexKey } from "../../constants/yandexKey";
import { getEventList, emptyEventList } from "./api";
import { ModelsEventCard } from "../../api/Api";
import { MapEventList } from "./MapEventList";
import bridge from "@vkontakte/vk-bridge";
import { Avatar, Snackbar } from "@vkontakte/vkui";
import { Icon20PlaceOutline } from "@vkontakte/icons";
import { PlacemarkImage } from "../MapPeopleWidget/MapPeopleWidget.config";

interface Props {
	mapHeight?: number;
	onEventClick: (eventId: number) => void;
}

export const MapEventsWidget: React.FC<Props> = ({
	onEventClick,
	mapHeight,
}) => {
	let mapRef = useRef(null);

	const [events, setEvents] = useState(emptyEventList);
	const [activeEvent, setActiveEvent] = useState<number | null>(null);
	const [mapState, setMapState] = useState(defaultMapData);
	const [notify, setNotify] = useState<React.ReactNode | null>(null);
	const [userLocation, setUserLocation] = useState({
		latitude: 0,
		longitude: 0,
	});

	const showGeoNotify = (text: string) => {
		// if (notify) return;
		setNotify(
			<Snackbar
				onClose={() => setNotify(null)}
				before={
					<Avatar size={24} style={{ background: "var(--accent)" }}>
						<Icon20PlaceOutline fill="#fff" width={14} height={14} />
					</Avatar>
				}
			>
				{text}
			</Snackbar>
		);
	};

	const getUserGeo = async () => {
		const data = await bridge.send("VKWebAppGetGeodata");

		try {
			if (data.available === 0) {
				showGeoNotify(
					"Включите использование геолокации в настройках телефона"
				);
			}
			if (data.available === 1) {
				setMapState({
					location: [data.lat, data.long],
					zoom: 10,
				});
				setUserLocation({ latitude: data.lat, longitude: data.long });
			}
		} catch (err) {
			console.error(err);
			showGeoNotify(
				"Разрешите приложению доступ к местоположению и включите геолокацию"
			);
		}
	};

	useEffect(() => {
		console.log("sdkjnlfgk;jhwerj");

		getUserGeo();
	}, []);

	const handleGetEventList = async (): Promise<void> => {
		try {
			// @ts-ignore
			const data = await getEventList(mapRef?.getBounds());
			setEvents(data);
		} catch (err) {
			console.error(err);
		}
	};

	function handleClickEvent({ id, latitude, longitude }: ModelsEventCard) {
		if (id === activeEvent) {
			setActiveEvent(null);
			onEventClick(id);
			return;
		}

		setActiveEvent(id);
		setMapState({
			location: [latitude, longitude],
			zoom: 13,
		});
	}

	return (
		<div>
			<YMaps query={YandexKey}>
				<Map
					height={mapHeight}
					width="100%"
					modules={["geolocation"]}
					state={{
						center: mapState.location,
						zoom: mapState.zoom,
					}}
					options={{
						suppressMapOpenBlock: true,
						mapStateAutoApply: true,
					}}
					instanceRef={(ref) => {
						// @ts-ignore
						if (ref) mapRef = ref;
					}}
					onLoad={handleGetEventList}
					onActionBreak={handleGetEventList}
					onActionEnd={handleGetEventList}
				>
					<ZoomControl />
					<GeolocationControl
						options={{ noPlacemark: true }}
						onClick={() => {
							getUserGeo();
						}}
						onLoad={() => {
							getUserGeo();
						}}
					/>
					{userLocation.latitude !== 0 && (
						<Placemark
							geometry={[userLocation.latitude, userLocation.longitude]}
							options={PlacemarkImage.location}
						/>
					)}
					{events.map((event) => (
						<Placemark
							key={event.id}
							geometry={[event.latitude, event.longitude]}
							onClick={() => handleClickEvent(event)}
						/>
					))}
				</Map>
			</YMaps>
			<MapEventList
				eventList={events}
				activeEvent={activeEvent}
				onEventClick={handleClickEvent}
			/>
			{notify}
		</div>
	);
};
