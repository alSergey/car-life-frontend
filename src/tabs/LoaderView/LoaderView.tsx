import React, { useEffect } from "react";
import { Panel, Spinner, View } from "@vkontakte/vkui";
import { backBaseUrl } from "../../constants/url";
import bridge from "@vkontakte/vk-bridge";

interface Prop {
	id: string;
	onLogin: () => void;
	onReg: () => void;
}

export const LoaderView: React.FC<Prop> = ({ id, onLogin, onReg }) => {
	const handleGetUserData = async () => {
		// const userData = await bridge.send("VKWebAppGetUserInfo");

		try {
			const session = await fetch(`${backBaseUrl}/login`, {
				method: "POST",
				body: JSON.stringify({
					vkid: 14,
				}),
			});

			if (session.status === 401) {
				onReg();
				return;
			}

			onLogin();
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		handleGetUserData();
	}, []);

	return (
		<View activePanel="loaderPanel" id={id}>
			<Panel id="loaderPanel" centered>
				<Spinner size="large" />
			</Panel>
		</View>
	);
};
