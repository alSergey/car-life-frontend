import React, { useEffect, useState } from "react";
import "@vkontakte/vkui/dist/vkui.css";
import "@vkontakte/vkui/dist/unstable.css";
import bridge from "@vkontakte/vk-bridge";
import { AppRoot, Epic } from "@vkontakte/vkui";
import { NavBar } from "./components/NavBar";
import { MainTab } from "./tabs/MainTab";
import { MapTab } from "./tabs/MapTab";
import { ProfileTab } from "./tabs/ProfileTab";
import { RegView } from "./tabs/RegView";

enum Tab {
	Main = "main",
	Map = "map",
	Profile = "profile",
	Reg = "reg",
}

const App: React.FC = () => {
	const [activeView, setActiveView] = useState(Tab.Reg);

	const fetchData = async () => {
		const user = await bridge.send("VKWebAppGetUserInfo");

		console.log(user);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<AppRoot>
			{activeView !== Tab.Reg && (
				<Epic
					activeStory={activeView}
					tabbar={
						<NavBar
							activeStory={activeView}
							mainTab={Tab.Main}
							mapTab={Tab.Map}
							profileTab={Tab.Profile}
							onMainClick={() => setActiveView(Tab.Main)}
							onMapClick={() => setActiveView(Tab.Map)}
							onProfileClick={() => setActiveView(Tab.Profile)}
						/>
					}
				>
					<MainTab id={Tab.Main} />
					<MapTab id={Tab.Main} />
					<ProfileTab id={Tab.Profile} />
				</Epic>
			)}
			<RegView id={Tab.Reg} />
		</AppRoot>
	);
};

export default App;
