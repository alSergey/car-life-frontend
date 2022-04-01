import React, { useRef, useState } from "react";
import {
	FormItem,
	Input,
	Textarea,
	FormLayout,
	Button,
	FormLayoutGroup,
	File,
} from "@vkontakte/vkui";
import { Icon24Camera } from "@vkontakte/icons";
import { EventForm, emptyEventForm, isEventFormFilled } from "./api";
import { YMaps, Map, SearchControl, Placemark } from "react-yandex-maps";
import { YandexKey } from "../../constants/yandexKey";

interface Props {
	buttonText?: string;
	onSubmit: (form: EventForm) => void;
}

export const CreateEventForm: React.FC<Props> = ({ buttonText, onSubmit }) => {
	const [form, setFormData] = useState(emptyEventForm);
	const [yMaps, setYMaps] = useState(null);
	const myMap = useRef(null);
	const inputMapRef = useRef(null);

	return (
		<FormLayout
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit(form);
			}}
		>
			<FormItem top="Название">
				<Input
					type="text"
					placeholder="Не указано"
					value={form.name}
					onChange={({ target: { value } }) => {
						setFormData({
							...form,
							name: value,
						});
					}}
				/>
			</FormItem>
			<FormItem top="Описание">
				<Textarea
					rows={1}
					placeholder="Не указано"
					value={form.description}
					onChange={({ target: { value } }) => {
						setFormData({
							...form,
							description: value,
						});
					}}
				/>
			</FormItem>
			<FormLayoutGroup mode="horizontal">
				<FormItem top="Дата">
					<Input
						type="date"
						value={form.date}
						onChange={({ target: { value } }) => {
							setFormData({
								...form,
								date: value,
							});
						}}
					/>
				</FormItem>
				<FormItem top="Время">
					<Input
						type="time"
						value={form.time}
						onChange={({ target: { value } }) => {
							setFormData({
								...form,
								time: value,
							});
						}}
					/>
				</FormItem>
			</FormLayoutGroup>
			<FormItem top="Место">
				<Input getRef={inputMapRef} disabled style={{ marginBottom: "15px" }} />
				<YMaps query={YandexKey}>
					<Map
						defaultState={{
							center: [form.location.latitude, form.location.longitude],
							zoom: 11,
						}}
						width={"100%"}
						height={"400px"}
						options={{
							yandexMapDisablePoiInteractivity: true,
							suppressMapOpenBlock: true,
						}}
						// @ts-ignore
						onLoad={(ymaps) => setYMaps(ymaps)}
						onClick={(e: any) => {
							setFormData({
								...form,
								location: {
									latitude: e.get("coords")[0],
									longitude: e.get("coords")[1],
								},
							});
							// @ts-ignore
							const myGeocoder = yMaps?.geocode(
								[e.get("coords")[0], e.get("coords")[1]],
								{ provider: "yandex#map", kind: "house" }
							);
							myGeocoder.then((res: any) => {
								// @ts-ignore
								inputMapRef.current.value = res.geoObjects
									.get(0)
									.properties.get("text");
							});
						}}
						instanceRef={(ref) => {
							// @ts-ignore
							if (ref) myMap.current = ref;
						}}
					>
						<SearchControl
							onResultShow={(res: any) => {
								const resIndex = res.originalEvent.index;
								const coordinates =
									res.originalEvent.target.state._data.results[resIndex]
										.geometry._coordinates;
								if (coordinates) {
									setFormData({
										...form,
										location: {
											latitude: coordinates[0],
											longitude: coordinates[1],
										},
									});
									// @ts-ignore
									const myGeocoder = yMaps?.geocode(
										[coordinates[0], coordinates[1]],
										{ provider: "yandex#map", kind: "house" }
									);
									myGeocoder.then((result: any) => {
										// @ts-ignore
										inputMapRef.current.value = result.geoObjects
											.get(0)
											.properties.get("text");
									});
								}
							}}
							modules={["geocode"]}
							options={{
								float: "right",
								provider: "yandex#map",
								noPlacemark: true,
							}}
						/>
						<Placemark
							geometry={[form.location.latitude, form.location.longitude]}
							options={{ draggable: true }}
						/>
					</Map>
				</YMaps>
			</FormItem>
			<FormItem top="Аватарка">
				<File
					stretched
					name="file-upload"
					controlSize="l"
					before={<Icon24Camera />}
					accept=".jpeg,.jpg,.png.webp"
					onChange={({ target: { files } }) => {
						if (!files) return;

						setFormData({
							...form,
							file: files[0],
						});
					}}
				>
					Открыть галерею
				</File>
			</FormItem>
			<FormItem>
				<Button
					stretched
					size="l"
					type="submit"
					disabled={!isEventFormFilled(form)}
				>
					{buttonText || "Создать"}
				</Button>
			</FormItem>
		</FormLayout>
	);
};
