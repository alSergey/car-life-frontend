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
import { defaultUserData, UserProvider } from "./context/userContext";

enum Tab {
	Main = "main",
	Map = "map",
	Profile = "profile",
	Loader = "loader",
	Reg = "reg",
}

const App: React.FC = () => {
	const [activeView, setActiveView] = useState(Tab.Loader);
	const [userData, setUserData] = useState(defaultUserData);

	return (
		<UserProvider value={{ userState: userData }}>
			<AppRoot>
				{activeView !== Tab.Reg && activeView !== Tab.Loader && (
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
				)}
				{activeView === Tab.Loader && (
					<LoaderView
						id={Tab.Loader}
						onLogin={() => setActiveView(Tab.Map)}
						onReg={() => setActiveView(Tab.Reg)}
						setUserInfo={(data) => setUserData(data)}
					/>
				)}
				{activeView === Tab.Reg && (
					<RegView id={Tab.Reg} onSubmit={() => setActiveView(Tab.Map)} />
				)}
			</AppRoot>
		</UserProvider>
	);
};

export default App;
