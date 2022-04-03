import React from "react";
import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import {
	Icon28LocationMapOutline,
	Icon28NewsfeedOutline,
	Icon28UserCircleOutline,
} from "@vkontakte/icons";
import {
	MAIN_PAGE,
	MAIN_VIEW,
	MAP_PAGE,
	MAP_VIEW,
	PROFILE_PAGE,
	PROFILE_VIEW,
} from "../../router";
import { useLocation, useRouter } from "@happysanta/router";

export const NavBar: React.FC = () => {
	const location = useLocation();
	const router = useRouter();

	return (
		<Tabbar>
			<TabbarItem
				selected={MAIN_VIEW === location.getViewId()}
				data-story={MAIN_VIEW}
				onClick={() => router.pushPage(MAIN_PAGE)}
				text="Главная"
			>
				<Icon28NewsfeedOutline />
			</TabbarItem>
			<TabbarItem
				selected={MAP_VIEW === location.getViewId()}
				data-story={MAP_VIEW}
				onClick={() => router.pushPage(MAP_PAGE)}
				text="Карта"
			>
				<Icon28LocationMapOutline />
			</TabbarItem>
			<TabbarItem
				selected={PROFILE_VIEW === location.getViewId()}
				data-story={PROFILE_VIEW}
				onClick={() => router.pushPage(PROFILE_PAGE)}
				text="Профиль"
			>
				<Icon28UserCircleOutline />
			</TabbarItem>
		</Tabbar>
	);
};
