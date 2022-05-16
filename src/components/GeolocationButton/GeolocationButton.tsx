import React, { ReactNode, useState } from "react";
import { Avatar, Snackbar } from "@vkontakte/vkui";
import { Icon20PlaceOutline } from "@vkontakte/icons";
import { GeolocationControl, Placemark } from "react-yandex-maps";
import bridge from "@vkontakte/vk-bridge";

interface Props {
	onLoadLocation?: boolean;
	onUpdate: (location: number[]) => void;
}

export const GeolocationButton: React.FC<Props> = ({
	onLoadLocation,
	onUpdate,
}) => {
	const [userLocation, setUserLocation] = useState<number[]>([]);
	const [snackbar, setSnackbar] = useState<ReactNode | null>(null);

	const openSnackbar = (): void => {
		setSnackbar(
			<Snackbar
				onClose={() => setSnackbar(null)}
				before={
					<Avatar size={24} style={{ background: "var(--accent)" }}>
						<Icon20PlaceOutline fill="#fff" width={14} height={14} />
					</Avatar>
				}
			>
				Разрешите приложению доступ к местоположению, чтобы мы могли отобразить
				ее на карте
			</Snackbar>
		);
	};

	const getUserLocation = async (): Promise<void> => {
		try {
			const data = await bridge.send("VKWebAppGetGeodata");
			console.log(data);

			if (data.available === 0 || !data.available) {
				openSnackbar();
			}

			if (data.available === 1 || data.available) {
				const location = [data.lat, data.long];
				onUpdate(location);
				setUserLocation(location);
			}
		} catch (e) {
			console.log(e);
			openSnackbar();
		}
	};

	return (
		<div>
			<GeolocationControl
				options={{
					selectOnClick: false,
					noPlacemark: true,
				}}
				onClick={() => {
					getUserLocation();
				}}
				onLoad={() => {
					if (!onLoadLocation) return;
					getUserLocation();
				}}
			/>
			{userLocation.length !== 0 && (
				<Placemark
					geometry={userLocation}
					options={{
						preset: "islands#geolocationIcon",
					}}
				/>
			)}
			{snackbar}
		</div>
	);
};
