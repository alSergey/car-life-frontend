import React, { useEffect, useState } from "react";
import { Epic, Spinner } from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";
import { useRouter, useLocation } from "@happysanta/router";
import { NavBar } from "./components/NavBar";
import { MainTab } from "./views/MainTab";
import { MapTab } from "./views/MapTab";
import { ProfileTab } from "./views/ProfileTab";
import { RegView } from "./views/RegView";
import {
	defaultUserData,
	getUserData,
	UserProvider,
} from "./context/userContext";
import {
	MAIN_VIEW,
	MAP_PAGE,
	MAP_VIEW,
	PROFILE_VIEW,
	REG_VIEW,
	REG_WELCOME_PAGE,
} from "./router";
import { api, setToken } from "./api";

export const App: React.FC = () => {
	const router = useRouter();
	const location = useLocation();

	const [userData, setUserData] = useState(defaultUserData);
	const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null);
	const [loading, setLoading] = useState(true);

	const handleGetUserData = async (): Promise<void> => {
		try {
			const data = await getUserData();
			setUserData(data);
		} catch (err) {
			console.error(err);
		}
	};

	const handleLogin = async () => {
		const data = await bridge.send("VKWebAppGetUserInfo");

		try {
			const session = await api.login.loginCreate({
				vkid: data.id,
			});

			setToken(session.data.value);
			setIsLoggedIn(true);
			handleGetUserData();
			if (location.getViewId() === REG_VIEW) router.pushPage(MAP_PAGE);
		} catch (err) {
			console.error(err);
			if (err.response.status !== 401) return;

			setIsLoggedIn(false);
			if (location.getViewId() !== REG_VIEW) router.pushPage(REG_WELCOME_PAGE);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		handleLogin();
	}, []);

	return (
		<UserProvider
			value={{
				isLoggedIn,
				setIsLoggedIn,
				userState: userData,
				refreshUserState: handleGetUserData,
			}}
		>
			{loading && <Spinner size="large" />}
			{location.getViewId() !== REG_VIEW && (
				<Epic activeStory={location.getViewId()} tabbar={<NavBar />}>
					<MainTab id={MAIN_VIEW} />
					<MapTab id={MAP_VIEW} />
					<ProfileTab id={PROFILE_VIEW} />
				</Epic>
			)}
			{location.getViewId() === REG_VIEW && <RegView id={REG_VIEW} />}
		</UserProvider>
	);
};
