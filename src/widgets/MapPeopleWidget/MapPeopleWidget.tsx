import React, { useEffect, useRef, useState } from "react";
import {
	GeolocationControl,
	Map,
	Placemark,
	YMaps,
	ZoomControl,
} from "react-yandex-maps";
import { emptyEventList, emptyNewMiniEvent } from "./api/api.consts";
import { YandexKey } from "../../constants/yandexKey";
import { getPrettyTime } from "../../constants/time";
import { ModelsCreateMiniEventRequest, ModelsMiniEvent } from "../../api/Api";
import { getMiniEventList } from "./api";
import { EventsTypes, PlacemarkImage } from "./MapPeopleWidget.config";
import {
	Button,
	CustomSelect,
	FormItem,
	FormLayout,
	Input,
	Textarea,
	Tooltip,
	TooltipContainer,
} from "@vkontakte/vkui";
import styles from "./MapPeopleWidget.module.css";
import { Dropdown } from "@vkontakte/vkui/unstable";
import { createNewMiniEvent } from "./api/api";

export const MapPeopleWidget: React.FC = () => {
	const [events, setEvents] = useState(emptyEventList);
	const [showCreation, setShowCreation] = useState(false);
	const [newEvent, setNewEvent] =
		useState<ModelsCreateMiniEventRequest>(emptyNewMiniEvent);
	const myMap = useRef(null);
	const [mapCenter, setMapCenter] = useState([55.76, 37.64]);
	const mapHeight = window.innerHeight - 95;

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

	const handleClickNewEvent = async () => {
		setShowCreation(false);
		try {
			const eventId = await createNewMiniEvent(newEvent);
			if (!eventId) return;
			setShowCreation(false);
			setNewEvent(emptyNewMiniEvent);
			handleGetEventList();
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		handleGetEventList();
	}, []);

	function handleClickEvent(this: ModelsMiniEvent) {
		setMapCenter([this.latitude, this.longitude]);
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
					}}
					instanceRef={(ref) => {
						// @ts-ignore
						if (ref) myMap.current = ref;
					}}
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
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					onClick={(e: any) => {
						setNewEvent({
							...newEvent,
							latitude: e.get("coords")[0],
							longitude: e.get("coords")[1],
						});
					}}
					modules={[
						"templateLayoutFactory",
						"layout.ImageWithContent",
						"geolocation",
					]}
				>
					<ZoomControl options={{ float: "right" }} />
					<GeolocationControl options={{ float: "left" }} />
					{events.map((e) => {
						return (
							<Placemark
								onClick={handleClickEvent.bind(e)}
								key={e.id}
								geometry={[e.latitude, e.longitude]}
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
								options={{
									...getExtraOptions(e.type.id),
								}}
								modules={["geoObject.addon.hint", "geoObject.addon.balloon"]}
							/>
						);
					})}
					{/* <Button className={styles.buttonRide} onClick={}>Поехали</Button> */}
					<Button
						style={{
							visibility: newEvent.latitude !== 0 ? "visible" : "hidden",
						}}
						className={styles.buttonAdd}
						onClick={() => {
							if (showCreation) {
								setShowCreation(false);
							} else {
								setShowCreation(true);
							}
						}}
					>
						+
					</Button>
					<div
						style={{
							position: "fixed",
							bottom: 128,
							right: 10,
							backgroundColor: "white",
							borderRadius: 10,
							zIndex: showCreation ? 10 : -1,
						}}
					>
						<FormLayout style={{ display: "inline-block" }}>
							<FormItem top="Тип события">
								<CustomSelect
									placeholder="Не выбран"
									options={EventsTypes}
									value={newEvent.type_id}
									onChange={({ target: { value } }) => {
										setNewEvent({
											...newEvent,
											type_id: Number(value),
										});
									}}
								/>
							</FormItem>
							<FormItem top="Краткое описание">
								<Textarea
									rows={1}
									placeholder="Не указано"
									value={newEvent.description}
									onChange={({ target: { value } }) => {
										setNewEvent({
											...newEvent,
											description: value,
										});
									}}
								/>
							</FormItem>
							<FormItem top="До скольки актуальна точка">
								<Input
									type="time"
									value={newEvent.ended_at}
									onChange={({ target: { value } }) => {
										setNewEvent({
											...newEvent,
											ended_at: value,
										});
									}}
								/>
							</FormItem>
							<FormItem>
								<Button onClick={handleClickNewEvent}>Создать</Button>
							</FormItem>
						</FormLayout>
					</div>
					<Placemark
						geometry={[newEvent.latitude, newEvent.longitude]}
						options={{ draggable: true }}
					/>
				</Map>
			</YMaps>
		</div>
	);
};
