import React from "react";
import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import {
	Icon28LocationMapOutline,
	Icon28NewsfeedOutline,
	Icon28UserCircleOutline,
} from "@vkontakte/icons";

interface Props {
	mainTab: string;
	mapTab: string;
	profileTab: string;
	activeStory: string;
	onMainClick: () => void;
	onMapClick: () => void;
	onProfileClick: () => void;
}

export const NavBar: React.FC<Props> = ({
	mainTab,
	mapTab,
	profileTab,
	activeStory,
	onMainClick,
	onMapClick,
	onProfileClick,
}) => (
	<Tabbar>
		<TabbarItem
			selected={activeStory === mainTab}
			data-story={mainTab}
			onClick={onMainClick}
			text="Главная"
		>
			<Icon28NewsfeedOutline />
		</TabbarItem>
		<TabbarItem
			selected={activeStory === mapTab}
			data-story={mapTab}
			onClick={onMapClick}
			text="Карта"
		>
			<Icon28LocationMapOutline />
		</TabbarItem>
		<TabbarItem
			selected={activeStory === profileTab}
			data-story={profileTab}
			onClick={onProfileClick}
			text="Профиль"
		>
			<Icon28UserCircleOutline />
		</TabbarItem>
	</Tabbar>
);
