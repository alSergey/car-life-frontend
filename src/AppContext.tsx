import React, { useEffect } from "react";
import { AdaptivityProvider, ConfigProvider } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import "@vkontakte/vkui/dist/unstable.css";
import bridge from "@vkontakte/vk-bridge";
import { RouterContext } from "@happysanta/router";
import { router } from "./router";
import { App } from "./App";

export const AppContext: React.FC = () => {
	useEffect(() => {
		bridge.send("VKWebAppAllowMessagesFromGroup", {
			group_id: 212586637,
		});
	}, []);

	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<RouterContext.Provider value={router}>
					<App />
				</RouterContext.Provider>
			</AdaptivityProvider>
		</ConfigProvider>
	);
};
