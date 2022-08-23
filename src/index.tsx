import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import { initSentry } from "./sentryInit";
import { initYandex } from "./yandexInit";
import { AppContext } from "./AppContext";

// Init VK  Mini App
bridge.send("VKWebAppInit");

ReactDOM.render(<AppContext />, document.getElementById("root"));

// development
if (process.env.NODE_ENV === "development") {
	import("./eruda").then(() => {}); // Init eruda
}

// production
if (process.env.NODE_ENV !== "development") {
	initSentry(); // Init Sentry
	initYandex(); // Init Yandex
}
