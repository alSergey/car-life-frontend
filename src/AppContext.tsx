import React, { useEffect } from "react";
import { AdaptivityProvider, AppRoot, ConfigProvider } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import "@vkontakte/vkui/dist/unstable.css";
import bridge from "@vkontakte/vk-bridge";
import { RouterContext } from "@happysanta/router";
import { router } from "./router";
import { AppModals } from "./AppModals";

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
					<AppRoot>
						<AppModals />
					</AppRoot>
				</RouterContext.Provider>
			</AdaptivityProvider>
		</ConfigProvider>
	);
};
