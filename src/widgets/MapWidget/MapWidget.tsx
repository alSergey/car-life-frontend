import React, { useEffect, useRef, useState } from "react";
import { Map, Placemark, YMaps } from "react-yandex-maps";
import { getEventList } from "./api";
import { emptyEventList } from "./api/api.consts";
import {
	Avatar,
	Group,
	HorizontalCell,
	HorizontalScroll,
	Panel,
} from "@vkontakte/vkui";
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

	function handleClickEvent() {
		const map = myMap.current;
		if (map) {
			// @ts-ignore
			map.action._map.setCenter([this.latitude, this.longitude]);
			// @ts-ignore
			map.action._map.setZoom(13);
		}
	}

	return (
		<Panel id={id}>
			<YMaps query={YandexKey}>
				<Map
					defaultState={{
						center: [55.684758, 37.738521],
						zoom: 11,
					}}
					width={"100%"}
					height={"800px"}
					options={{
						suppressMapOpenBlock: true,
					}}
					instanceRef={(ref) => {
						// @ts-ignore
						if (ref) myMap.current = ref;
					}}
				>
					<Group
						style={{
							position: "absolute",
							bottom: "44px",
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
								{events.map((e) => {
									return (
										<HorizontalCell
											key={e.id}
											header={e.name}
											subtitle={e.event_date}
											size="l"
											onClick={handleClickEvent.bind(e)}
										>
											<Avatar size={128} mode="image" src={e.avatar} />
											<Placemark
												key={e.id}
												geometry={[e.latitude, e.longitude]}
											/>
										</HorizontalCell>
									);
								})}
							</div>
						</HorizontalScroll>
					</Group>
					{/* {events.map((e) => ( */}
					{/* 		<Placemark key={e.id} geometry={[e.latitude, e.longitude]} /> */}
					{/* ))} */}
				</Map>
			</YMaps>
		</Panel>
	);
};
