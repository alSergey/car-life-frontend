import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import { initSentry } from "./sentry-init";
import { AppContext } from "./AppContext";

// Init Sentry
initSentry();

// Init VK  Mini App
bridge.send("VKWebAppInit");

ReactDOM.render(<AppContext />, document.getElementById("root"));

if (process.env.NODE_ENV === "development") {
	import("./eruda").then(() => {}); // runtime download
}
