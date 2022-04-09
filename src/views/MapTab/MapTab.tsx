import React, { useContext, useEffect } from "react";
import { View } from "@vkontakte/vkui";
import { EventPage } from "../../pages/EventPage";
import {
	MAP_PANEL,
	REG_WELCOME_PAGE,
	MAP_EVENT_PAGE,
	MAP_EVENT_PANEL,
	MAP_USER_PAGE,
	MAP_USER_PANEL,
	MAP_CLUB_PAGE,
	MAP_CLUB_PANEL,
	MAP_CAR_PAGE,
	setCarPageQuery,
	setClubPageQuery,
	setUserPageQuery,
	setEventPageQuery,
} from "../../router";
import { MapPage } from "../../pages/MapPage";
import { ClubPage } from "../../pages/ClubPage";
import { UserPage } from "../../pages/UserPage";
import { useLocation, useRouter } from "@happysanta/router";
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
				onClubClick={(clickClubId) =>
					router.pushPage(MAP_CLUB_PAGE, setClubPageQuery(clickClubId))
				}
				onUserClick={(clickUserId) =>
					router.pushPage(MAP_USER_PAGE, setUserPageQuery(clickUserId))
				}
			/>
			<ClubPage
				id={MAP_CLUB_PANEL}
				onBackClick={() => router.popPage()}
				onEventClick={(clickEventId) =>
					router.pushPage(MAP_EVENT_PAGE, setEventPageQuery(clickEventId))
				}
				onCarClick={(clickCarId) =>
					router.pushPage(MAP_CAR_PAGE, setCarPageQuery(clickCarId))
				}
				onUserClick={(clickUserId) =>
					router.pushPage(MAP_USER_PAGE, setUserPageQuery(clickUserId))
				}
			/>
			<UserPage
				id={MAP_USER_PANEL}
				onBackClick={() => router.popPage()}
				onEventClick={(clickEventId) =>
					router.pushPage(MAP_EVENT_PAGE, setEventPageQuery(clickEventId))
				}
				onClubClick={(clickClubId) =>
					router.pushPage(MAP_CLUB_PAGE, setClubPageQuery(clickClubId))
				}
				onCarClick={(clickCarId) =>
					router.pushPage(MAP_CAR_PAGE, setCarPageQuery(clickCarId))
				}
			/>
		</View>
	);
};
