import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import bridge from "@vkontakte/vk-bridge";
import { RouterContext } from "@happysanta/router";
import { ConfigProvider, AdaptivityProvider } from "@vkontakte/vkui";
import { router } from "./router";

// Init VK  Mini App
bridge.send("VKWebAppInit");

ReactDOM.render(
	<ConfigProvider>
		<AdaptivityProvider>
			<RouterContext.Provider value={router}>
				<App />
			</RouterContext.Provider>
		</AdaptivityProvider>
	</ConfigProvider>,
	document.getElementById("root")
);

if (process.env.NODE_ENV === "development") {
	import("./eruda").then(() => {}); // runtime download
}
