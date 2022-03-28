import React, { useEffect, useRef, useState } from "react";
import { Map, Placemark, YMaps } from "react-yandex-maps";
import { getEventList } from "./api";
import { emptyEventList } from "./api/api.consts";
import { Panel } from "@vkontakte/vkui";
import { YandexKey } from "../../constants/yandexKey";

interface Props {
	id: string;
}

export const MapWidget: React.FC<Props> = ({ id }) => {
	const [events, setEvents] = useState(emptyEventList);
	const myMap = useRef(null);

	const handleGetEventList = async (): Promise<void> => {
		try {
			const data = await getEventList();
			setEvents(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		handleGetEventList();
	}, []);
	return (
		<Panel id={id}>
			<YMaps query={YandexKey}>
				<Map
					defaultState={{
						center: [55.751574, 37.573856],
						zoom: 11,
					}}
					onLoad={() => {
						{
							events.map((e) => (
								<Placemark key={e.id} geometry={[e.latitude, e.longitude]} />
							));
						}
					}}
					width={"100%"}
					height={"800px"}
					options={{
						yandexMapDisablePoiInteractivity: true,
						suppressMapOpenBlock: true,
					}}
					instanceRef={(ref) => {
						// @ts-ignore
						if (ref) myMap.current = ref;
					}}
				>
					{events.map((e) => (
						<Placemark key={e.id} geometry={[e.latitude, e.longitude]} />
					))}
				</Map>
			</YMaps>
		</Panel>
	);
};
