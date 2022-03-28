import React, { useState } from "react";
import { AppRoot, Epic } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import "@vkontakte/vkui/dist/unstable.css";
import { MainTab } from "./tabs/MainTab";
import { MapTab } from "./tabs/MapTab";
import { ProfileTab } from "./tabs/ProfileTab";
import { NavBar } from "./components/NavBar";

enum Tab {
	Main = "main",
	Map = "map",
	Profile = "profile",
}

const App: React.FC = () => {
	const [activeView, setActiveView] = useState(Tab.Main);

	return (
		<AppRoot>
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
				<MapTab id={Tab.Map} />
				<ProfileTab id={Tab.Profile} />
			</Epic>
		</AppRoot>
	);
};

export default App;
