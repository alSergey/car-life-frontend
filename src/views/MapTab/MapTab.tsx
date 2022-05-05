import React, { useContext, useEffect } from "react";
import { View } from "@vkontakte/vkui";
import { EventPage } from "../../pages/EventPage";
import {
	MAP_PANEL,
	MAP_PAGE_PREFIX,
	REG_WELCOME_PAGE,
	MAP_EVENT_PANEL,
	MAP_USER_PANEL,
	MAP_CLUB_PANEL,
	MAP_CAR_PANEL,
	MAP_CREATE_EVENT_PANEL,
} from "../../router";
import { MapPage } from "../../pages/MapPage";
import { ClubPage } from "../../pages/ClubPage";
import { UserPage } from "../../pages/UserPage";
import { CarPage } from "../../pages/CarPage";
import { useLocation, useRouter } from "@happysanta/router";
import { UserContext } from "../../context/userContext";
import { CreateEventPage } from "../../pages/CreateEventPage";

interface Props {
	id: string;
}

export const MapTab: React.FC<Props> = ({ id }) => {
	const location = useLocation();
	const router = useRouter();

	const { isLoggedIn } = useContext(UserContext);

	useEffect(() => {
		if (isLoggedIn === false) return router.pushPage(REG_WELCOME_PAGE);
	}, []);

	return (
		<View
			id={id}
			history={location.getViewHistory(id)}
			onSwipeBack={() => router.popPage()}
			// @ts-ignore
			activePanel={location.getViewActivePanel(id)}
		>
			<MapPage id={MAP_PANEL} pagePrefix={MAP_PAGE_PREFIX} />
			<CreateEventPage
				pagePrefix={MAP_PAGE_PREFIX}
				id={MAP_CREATE_EVENT_PANEL}
			/>
			<ClubPage id={MAP_CLUB_PANEL} pagePrefix={MAP_PAGE_PREFIX} />
			<EventPage id={MAP_EVENT_PANEL} pagePrefix={MAP_PAGE_PREFIX} />
			<UserPage id={MAP_USER_PANEL} pagePrefix={MAP_PAGE_PREFIX} />
			<CarPage id={MAP_CAR_PANEL} pagePrefix={MAP_PAGE_PREFIX} />
		</View>
	);
};
