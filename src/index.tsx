import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import { initSentry } from "./sentry-init";
import { ContextApp } from "./ContextApp";

// Init Sentry
initSentry();

// Init VK  Mini App
bridge.send("VKWebAppInit");

ReactDOM.render(<ContextApp />, document.getElementById("root"));

if (process.env.NODE_ENV === "development") {
	import("./eruda").then(() => {}); // runtime download
}
