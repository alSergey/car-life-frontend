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
	MAP_CAR_PANEL,
	setCarPageQuery,
	setClubPageQuery,
	setUserPageQuery,
	setEventPageQuery,
} from "../../router";
import { MapPage } from "../../pages/MapPage";
import { ClubPage } from "../../pages/ClubPage";
import { UserPage } from "../../pages/UserPage";
import { CarPage } from "../../pages/CarPage";
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

	const handleBackClick = (): void => {
		router.popPage();
	};

	const handleUserCLick = (userId: number): void => {
		router.pushPage(MAP_USER_PAGE, setUserPageQuery(userId));
	};

	const handleClubCLick = (clubId: number): void => {
		router.pushPage(MAP_CLUB_PAGE, setClubPageQuery(clubId));
	};

	const handleEventCLick = (eventId: number): void => {
		router.pushPage(MAP_EVENT_PAGE, setEventPageQuery(eventId));
	};

	const handleCarCLick = (carId: number): void => {
		router.pushPage(MAP_CAR_PAGE, setCarPageQuery(carId));
	};

	return (
		<View
			id={id}
			history={location.getViewHistory(id)}
			onSwipeBack={handleBackClick}
			// @ts-ignore
			activePanel={location.getViewActivePanel(id)}
		>
			<MapPage id={MAP_PANEL} onEventClick={handleEventCLick} />
			<EventPage
				id={MAP_EVENT_PANEL}
				onBackClick={handleBackClick}
				onClubClick={handleClubCLick}
				onUserClick={handleUserCLick}
			/>
			<ClubPage
				id={MAP_CLUB_PANEL}
				onBackClick={handleBackClick}
				onEventClick={handleEventCLick}
				onCarClick={handleCarCLick}
				onUserClick={handleUserCLick}
			/>
			<UserPage
				id={MAP_USER_PANEL}
				onBackClick={handleBackClick}
				onEventClick={handleEventCLick}
				onClubClick={handleClubCLick}
				onCarClick={handleCarCLick}
			/>
			<CarPage id={MAP_CAR_PANEL} onBackClick={handleBackClick} />
		</View>
	);
};
