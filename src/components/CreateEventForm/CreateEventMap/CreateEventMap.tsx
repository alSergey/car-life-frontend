import React, { useState } from "react";
import { Input } from "@vkontakte/vkui";
import {
	YMaps,
	// eslint-disable-next-line import/named
	YMapsApi,
	Map,
	GeolocationControl,
	Placemark,
	ZoomControl,
} from "react-yandex-maps";
import { defaultMapData, YandexKey } from "../../../constants/yandexKey";
import { EventLocation } from "../api";

interface Props {
	location: EventLocation | null;
	onChange: (form: EventLocation | null) => void;
}

export const CreateEventMap: React.FC<Props> = ({ location, onChange }) => {
	const [yMaps, setYMaps] = useState<YMapsApi | null>(null);
	const [locationText, setLocationText] = useState("");
	const [centerLocation, setCenterLocation] = useState(defaultMapData.location);

	return (
		<div>
			<Input
				style={{ marginBottom: "15px" }}
				type="text"
				id="map-suggest"
				defaultValue={locationText}
				placeholder="Поиск"
			/>
			<YMaps query={YandexKey}>
				<Map
					width="100%"
					height="400px"
					modules={["geocode", "SuggestView"]}
					state={{
						center: centerLocation,
						zoom: defaultMapData.zoom,
					}}
					options={{
						yandexMapDisablePoiInteractivity: true,
						suppressMapOpenBlock: true,
					}}
					onLoad={(ymaps) => {
						setYMaps(ymaps);
						const suggestView = new ymaps.SuggestView("map-suggest");

						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						suggestView.events.add("select", (e: any) => {
							ymaps
								.geocode(e.get("item").value)
								// eslint-disable-next-line @typescript-eslint/no-explicit-any
								.then((res: any) => {
									const coordinates =
										res.geoObjects.get(0).geometry._coordinates;

									setCenterLocation(coordinates);

									onChange({
										latitude: coordinates[0],
										longitude: coordinates[1],
									});
								});
						});
					}}
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					onClick={(e: any) => {
						yMaps
							?.geocode(e.get("coords"), {
								provider: "yandex#map",
								kind: "house",
							})
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							.then((res: any) => {
								setLocationText(res.geoObjects.get(0).properties.get("text"));
							});

						onChange({
							latitude: e.get("coords")[0],
							longitude: e.get("coords")[1],
						});
					}}
				>
					<ZoomControl />
					<GeolocationControl />
					{location && (
						<Placemark geometry={[location.latitude, location.longitude]} />
					)}
				</Map>
			</YMaps>
		</div>
	);
};
