import React from "react";
import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import {
	Icon28LocationMapOutline,
	Icon28NewsfeedOutline,
	Icon28UserCircleOutline,
} from "@vkontakte/icons";
import { ID_MAIN, ID_MAP, ID_PROFILE } from "../../constants/config";

interface Props {
	activeStory: string;
	onClubsClick: () => void;
	onMapClick: () => void;
	onProfileClick: () => void;
}

export const NavBar: React.FC<Props> = ({
	activeStory,
	onClubsClick,
	onMapClick,
	onProfileClick,
}) => (
	<Tabbar>
		<TabbarItem
			selected={activeStory === ID_MAIN}
			data-story={ID_MAIN}
			onClick={onClubsClick}
			text="Клубы"
		>
			<Icon28NewsfeedOutline />
		</TabbarItem>
		<TabbarItem
			selected={activeStory === ID_MAP}
			data-story={ID_MAP}
			onClick={onMapClick}
			text="Карта"
		>
			<Icon28LocationMapOutline />
		</TabbarItem>
		<TabbarItem
			selected={activeStory === ID_PROFILE}
			data-story={ID_PROFILE}
			onClick={onProfileClick}
			text="Профиль"
		>
			<Icon28UserCircleOutline />
		</TabbarItem>
	</Tabbar>
);
