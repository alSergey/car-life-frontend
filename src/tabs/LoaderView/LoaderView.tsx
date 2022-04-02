import React, { useEffect } from "react";
import { Panel, Spinner, View } from "@vkontakte/vkui";
import { backBaseUrl } from "../../constants/url";
import { defaultUser } from "../../context/userContext";
import { api } from "../../api";
import { ModelsUser } from "../../api/Api";

interface Prop {
	id: string;
	onLogin: () => void;
	onReg: () => void;
	setUserInfo: (data: ModelsUser) => void;
}

export const LoaderView: React.FC<Prop> = ({
	id,
	onLogin,
	onReg,
	setUserInfo,
}) => {
	const getUserData = async (): Promise<void> => {
		try {
			const { data } = await api.me.getMe();
			console.log(data);

			setUserInfo(data);
		} catch (e) {
			console.error(e);
		}
	};

	const handleGetUserData = async () => {
		// const userData = await bridge.send("VKWebAppGetUserInfo");

		try {
			const session = await fetch(`${backBaseUrl}/login`, {
				method: "POST",
				body: JSON.stringify({
					vkid: 1,
				}),
			});

			if (session.status === 401) {
				onReg();
				return;
			}

			if (session.status === 200) {
				getUserData();
				onLogin();
				return;
			}
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
