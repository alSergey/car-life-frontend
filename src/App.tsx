import React, { useState } from "react";
import "@vkontakte/vkui/dist/vkui.css";
import "@vkontakte/vkui/dist/unstable.css";
import { AppRoot, Epic } from "@vkontakte/vkui";
import { NavBar } from "./components/NavBar";
import { MainTab } from "./tabs/MainTab";
import { MapTab } from "./tabs/MapTab";
import { ProfileTab } from "./tabs/ProfileTab";
import { RegView } from "./tabs/RegView";
import { LoaderView } from "./tabs/LoaderView";

enum Tab {
	Main = "main",
	Map = "map",
	Profile = "profile",
	Loader = "loader",
	Reg = "reg",
}

const App: React.FC = () => {
	const [activeView, setActiveView] = useState(Tab.Loader);

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
			{activeView === Tab.Loader && (
				<LoaderView
					id={Tab.Loader}
					onLogin={() => setActiveView(Tab.Main)}
					onReg={() => setActiveView(Tab.Reg)}
				/>
			)}
			{activeView === Tab.Reg && (
				<RegView id={Tab.Reg} onSubmit={() => setActiveView(Tab.Main)} />
			)}
		</AppRoot>
	);
};

export default App;
