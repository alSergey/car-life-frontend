import React, { useEffect, useState } from "react";
import { Map, Placemark, YMaps, ZoomControl } from "react-yandex-maps";
import { defaultMapData, YandexKey } from "../../constants/yandexKey";
import { getPrettyTime } from "../../constants/time";
import { emptyEventList, getMiniEventList } from "./api";
import { PlacemarkImage } from "./MapPeopleWidget.config";
import { CreateMiniEventForm } from "./CreateMiniEventForm";
import { GeolocationButton } from "../../components/GeolocationButton";

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

	const handleGetEventList = async (): Promise<void> => {
		try {
			const data = await getMiniEventList();
			setEvents(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		handleGetEventList();
	}, []);

	return (
		<div>
			<YMaps query={YandexKey}>
				<Map
					height={mapHeight}
					width="100%"
					modules={["templateLayoutFactory", "layout.ImageWithContent"]}
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
				>
					<ZoomControl />
					<GeolocationButton
						onLoadLocation
						onUpdate={(location) => {
							setMapState({
								location,
								zoom: 13,
							});
						}}
					/>
					{events.map((e) => (
						<Placemark
							key={e.id}
							onClick={() => {
								setMapState({
									location: [e.latitude, e.longitude],
									zoom: defaultMapData.zoom,
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
		</div>
	);
};
