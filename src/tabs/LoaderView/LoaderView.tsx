import React, { useEffect } from "react";
import { Panel, Spinner, View } from "@vkontakte/vkui";
import { backBaseUrl } from "../../constants/url";
import { getUserData, UserData } from "../../context/userContext";

interface Prop {
	id: string;
	onLogin: () => void;
	onReg: () => void;
	setUserInfo: (data: UserData) => void;
}

export const LoaderView: React.FC<Prop> = ({
	id,
	onLogin,
	onReg,
	setUserInfo,
}) => {
	const handleGetUserData = async (): Promise<void> => {
		try {
			const data = await getUserData();
			setUserInfo(data);
		} catch (e) {
			console.error(e);
		}
	};

	const handleLogin = async () => {
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
				handleGetUserData();
				onLogin();
				return;
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		handleLogin();
	}, []);

	return (
		<View activePanel="loaderPanel" id={id}>
			<Panel id="loaderPanel" centered>
				<Spinner size="large" />
			</Panel>
		</View>
	);
};
