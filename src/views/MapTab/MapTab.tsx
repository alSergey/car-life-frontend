import React, { useContext, useEffect } from "react";
import { View } from "@vkontakte/vkui";
import { EventPage } from "../../pages/EventPage";
import {
	MAP_PANEL,
	MAP_EVENT_PAGE,
	MAP_EVENT_PANEL,
	MAP_USER_PAGE,
	REG_WELCOME_PAGE,
	setEventPageQuery,
	setUserPageQuery,
} from "../../router";
import { useLocation, useRouter } from "@happysanta/router";
import { MapPage } from "../../pages/MapPage";
import { UserContext } from "../../context/userContext";

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
			<MapPage
				id={MAP_PANEL}
				onEventClick={(clickEventId) =>
					router.pushPage(MAP_EVENT_PAGE, setEventPageQuery(clickEventId))
				}
			/>
			<EventPage
				id={MAP_EVENT_PANEL}
				onBackClick={() => router.popPage()}
				onUserClick={(clickUserId) =>
					router.pushPage(MAP_USER_PAGE, setUserPageQuery(clickUserId))
				}
			/>
		</View>
	);
};
