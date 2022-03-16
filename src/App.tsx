import React, { useState } from "react";
import { AppRoot, Epic } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { MainTab } from "./tabs/MainTab";
import { MapTab } from "./tabs/MapTab";
import { ProfileTab } from "./tabs/ProfileTab";
import { NavBar } from "./components/NavBar";
import { ID_MAIN, ID_MAP, ID_PROFILE } from "./constants/config";

const App: React.FC = () => {
	const [activeView, setActiveView] = useState(ID_MAIN);

	return (
		<AppRoot>
			<Epic
				activeStory={activeView}
				tabbar={
					<NavBar
						activeStory={activeView}
						onClubsClick={() => setActiveView(ID_MAIN)}
						onMapClick={() => setActiveView(ID_MAP)}
						onProfileClick={() => setActiveView(ID_PROFILE)}
					/>
				}
			>
				<MainTab id={ID_MAIN} />
				<MapTab id={ID_MAP} />
				<ProfileTab id={ID_PROFILE} onSubmit={() => setActiveView(ID_MAIN)} />
			</Epic>
		</AppRoot>
	);
};

export default App;
