import React, { useRef, useState } from "react";
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
					<GeolocationControl />
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
		</div>
	);
};
