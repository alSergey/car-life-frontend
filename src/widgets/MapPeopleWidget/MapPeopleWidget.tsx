import React, { useEffect, useState } from "react";
import {
	GeolocationControl,
	Map,
	Placemark,
	YMaps,
	ZoomControl,
} from "react-yandex-maps";
import { defaultMapData, YandexKey } from "../../constants/yandexKey";
import { getPrettyTime } from "../../constants/time";
import { emptyEventList, getMiniEventList } from "./api";
import { PlacemarkImage } from "./MapPeopleWidget.config";
import { CreateMiniEventForm } from "./CreateMiniEventForm";
import bridge from "@vkontakte/vk-bridge";
import { Avatar, Snackbar } from "@vkontakte/vkui";
import { Icon20PlaceOutline } from "@vkontakte/icons";

interface Location {
	latitude: number;
	longitude: number;
}

interface Props {
	mapHeight?: number;
}

export const MapPeopleWidget: React.FC<Props> = ({ mapHeight }) => {
	const [mapState, setMapState] = useState(defaultMapData);
	const [events, setEvents] = useState(emptyEventList);
	const [newEventLocation, setNewEventLocation] = useState<Location | null>(
		null
	);
	const [notify, setNotify] = useState<React.ReactNode | null>(null);
	const [userLocation, setUserLocation] = useState({
		latitude: 0,
		longitude: 0,
	});

	const getExtraOptions = (id: number) => {
		switch (id) {
			case 1:
				return PlacemarkImage.help;
			case 2:
				return PlacemarkImage.meeting;
			case 3:
				return PlacemarkImage.danger;
			default:
				return PlacemarkImage.default;
		}
	};
	const showGeoNotify = (content: string) => {
		if (notify) return;
		setNotify(
			<Snackbar
				onClose={() => setNotify(null)}
				before={
					<Avatar size={24} style={{ background: "var(--accent)" }}>
						<Icon20PlaceOutline fill="#fff" width={14} height={14} />
					</Avatar>
				}
			>
				{content}
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
					zoom: 12,
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

	const handleGetEventList = async (): Promise<void> => {
		try {
			const data = await getMiniEventList();
			setEvents(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getUserGeo();
		handleGetEventList();
	}, []);

	return (
		<div>
			<YMaps query={YandexKey}>
				<Map
					height={mapHeight}
					width="100%"
					state={{
						center: mapState.location,
						zoom: mapState.zoom,
					}}
					options={{
						suppressMapOpenBlock: true,
					}}
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					onClick={(e: any) =>
						setNewEventLocation({
							latitude: e.get("coords")[0],
							longitude: e.get("coords")[1],
						})
					}
					modules={[
						"templateLayoutFactory",
						"layout.ImageWithContent",
						"geolocation",
					]}
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
					{events.map((e) => (
						<Placemark
							key={e.id}
							onClick={() => {
								setMapState({
									location: [e.latitude, e.longitude],
									zoom: 13,
								});
							}}
							geometry={[e.latitude, e.longitude]}
							options={getExtraOptions(e.type.id)}
							modules={["geoObject.addon.hint", "geoObject.addon.balloon"]}
							properties={{
								balloonContentHeader: `<a>${e.type.public_name}</a><br>`,
								balloonContentBody:
									`<span class="description">${e.description}</span> <br/>` +
									`<a style="font-size: 21px; margin-right: 5px">&#9719;</a>
											<a style="font-style: italic">
											Актуально с ${getPrettyTime(e.created_at)} до ${getPrettyTime(e.ended_at)}
											</a><br/>`,
								balloonContentFooter: `<div style="display: flex; flex-direction: row; align-items: center">
													Создал ${e.user.name} ${e.user.surname}
													<img src="${e.user.avatar_url}" 
													style="border-radius: 50%; width: 24px; height: 24px; background-color: grey; margin-left: 5px"
													/>
													</div>`,
								hintContent: `${e.type.public_name}`,
							}}
						/>
					))}
					{newEventLocation && (
						<Placemark
							geometry={[newEventLocation.latitude, newEventLocation.longitude]}
						/>
					)}
				</Map>
			</YMaps>
			<CreateMiniEventForm
				location={newEventLocation}
				onCreate={() => {
					handleGetEventList();
					setNewEventLocation(null);
				}}
			/>
			{notify}
		</div>
	);
};
