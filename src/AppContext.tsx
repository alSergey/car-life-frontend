import React, { useEffect, useState } from "react";
import {
	AdaptivityProvider,
	ConfigProvider,
	Appearance,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import "@vkontakte/vkui/dist/unstable.css";
import bridge from "@vkontakte/vk-bridge";
import { RouterContext } from "@happysanta/router";
import { router } from "./router";
import { App } from "./App";

export const AppContext: React.FC = () => {
	const [appearance, setAppearance] = useState(Appearance.DARK);

	useEffect(() => {
		bridge.send("VKWebAppAllowMessagesFromGroup", {
			group_id: 212586637,
		});

		bridge.subscribe(({ detail: { type, data } }) => {
			if (type === "VKWebAppUpdateConfig") {
				// @ts-ignore
				setAppearance(data.appearance);
			}
		});
	}, []);

	return (
		<ConfigProvider appearance={appearance}>
			<AdaptivityProvider>
				<RouterContext.Provider value={router}>
					<App />
				</RouterContext.Provider>
			</AdaptivityProvider>
		</ConfigProvider>
	);
};
