import React, { useEffect, useState } from "react";
import "@vkontakte/vkui/dist/vkui.css";
import "@vkontakte/vkui/dist/unstable.css";
import { AppRoot, Epic, Spinner } from "@vkontakte/vkui";
import { NavBar } from "./components/NavBar";
import { MainTab } from "./views/MainTab";
import { MapTab } from "./views/MapTab";
import { ProfileTab } from "./views/ProfileTab";
import { RegView } from "./views/RegView";
import { backBaseUrl } from "./constants/url";
import {
	defaultUserData,
	getUserData,
	UserProvider,
} from "./context/userContext";
import { withRouter, RouterProps } from "@happysanta/router";
import {
	MAIN_VIEW,
	MAP_VIEW,
	MAP_PAGE,
	PROFILE_VIEW,
	REG_VIEW,
	REG_WELCOME_PAGE,
} from "./router";
import bridge from "@vkontakte/vk-bridge";

const App: React.FC<RouterProps> = ({ location, router }) => {
	const [userData, setUserData] = useState(defaultUserData);
	const [loading, setLoading] = useState(true);

	const handleGetUserData = async (): Promise<void> => {
		try {
			const data = await getUserData();
			setUserData(data);
		} catch (e) {
			console.error(e);
		}
	};

	const handleLogin = async () => {
		const data = await bridge.send("VKWebAppGetUserInfo");

		try {
			const session = await fetch(`${backBaseUrl}/login`, {
				method: "POST",
				body: JSON.stringify({
					vkid: data.id,
				}),
			});

			if (session.status === 401) {
				router.pushPage(REG_WELCOME_PAGE);
				return;
			}

			if (session.status === 200) {
				handleGetUserData();
				if (location.getViewId() === REG_VIEW) router.pushPage(MAP_PAGE);
				return;
			}
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		handleLogin();
	}, []);

	return (
		<UserProvider value={{ userState: userData }}>
			<AppRoot>
				{loading && <Spinner size="large" />}
				{location.getViewId() !== REG_VIEW && (
					<Epic activeStory={location.getViewId()} tabbar={<NavBar />}>
						<MainTab id={MAIN_VIEW} />
						<MapTab id={MAP_VIEW} />
						<ProfileTab id={PROFILE_VIEW} />
					</Epic>
				)}
				{location.getViewId() === REG_VIEW && (
					<RegView id={REG_VIEW} onSubmit={() => router.pushPage(MAP_PAGE)} />
				)}
			</AppRoot>
		</UserProvider>
	);
};

export default withRouter(App);
