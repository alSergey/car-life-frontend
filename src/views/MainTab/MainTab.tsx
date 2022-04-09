import React, { useContext, useEffect } from "react";
import { View } from "@vkontakte/vkui";
import { MainListPage } from "../../pages/MainListPage";
import { EventPage } from "../../pages/EventPage";
import { CreateEventPage } from "../../pages/CreateEventPage";
import { CreateClubPage } from "../../pages/CreateClubPage";
import { ClubPage } from "../../pages/ClubPage";
import { UserPage } from "../../pages/UserPage";
import {
	MAIN_PANEL,
	MAIN_CLUB_PAGE,
	MAIN_CLUB_PANEL,
	MAIN_EVENT_PAGE,
	MAIN_EVENT_PANEL,
	MAIN_CAR_PAGE,
	MAIN_CREATE_CLUB_PAGE,
	MAIN_CREATE_CLUB_PANEL,
	MAIN_CREATE_EVENT_PAGE,
	MAIN_CREATE_EVENT_PANEL,
	MAIN_USER_PAGE,
	MAIN_USER_PANEL,
	REG_WELCOME_PAGE,
	setEventPageQuery,
	setClubPageQuery,
	setUserPageQuery,
	setCarPageQuery,
} from "../../router";
import { useLocation, useRouter } from "@happysanta/router";
import { UserContext } from "../../context/userContext";

interface Props {
	id: string;
}

export const MainTab: React.FC<Props> = ({ id }) => {
	const location = useLocation();
	const router = useRouter();

	const { isLoggedIn } = useContext(UserContext);

	useEffect(() => {
		if (isLoggedIn === false) return router.pushPage(REG_WELCOME_PAGE);
	}, []);

	const handleUserCLick = (userId: number): void => {
		router.pushPage(MAIN_USER_PAGE, setUserPageQuery(userId));
	};

	const handleClubCLick = (clubId: number): void => {
		router.pushPage(MAIN_CLUB_PAGE, setClubPageQuery(clubId));
	};

	const handleEventCLick = (eventId: number): void => {
		router.pushPage(MAIN_EVENT_PAGE, setEventPageQuery(eventId));
	};

	const handleCarCLick = (carId: number): void => {
		router.pushPage(MAIN_CAR_PAGE, setCarPageQuery(carId));
	};

	return (
		<View
			id={id}
			history={location.getViewHistory(id)}
			onSwipeBack={() => router.popPage()}
			// @ts-ignore
			activePanel={location.getViewActivePanel(id)}
		>
			<MainListPage
				id={MAIN_PANEL}
				onEventCreateClick={() => router.pushPage(MAIN_CREATE_EVENT_PAGE)}
				onEventClick={handleEventCLick}
				onClubCreateClick={() => router.pushPage(MAIN_CREATE_CLUB_PAGE)}
				onClubClick={handleClubCLick}
			/>
			<CreateEventPage
				id={MAIN_CREATE_EVENT_PANEL}
				onBackClick={() => router.popPage()}
				onSubmit={handleEventCLick}
			/>
			<EventPage
				id={MAIN_EVENT_PANEL}
				onBackClick={() => router.popPage()}
				onClubClick={handleClubCLick}
				onUserClick={handleUserCLick}
			/>
			<CreateClubPage
				id={MAIN_CREATE_CLUB_PANEL}
				onBackClick={() => router.popPage()}
				onSubmit={handleClubCLick}
			/>
			<ClubPage
				id={MAIN_CLUB_PANEL}
				onBackClick={() => router.popPage()}
				onEventClick={handleEventCLick}
				onUserClick={handleUserCLick}
				onCarClick={handleCarCLick}
			/>
			<UserPage
				id={MAIN_USER_PANEL}
				onBackClick={() => router.popPage()}
				onEventClick={handleEventCLick}
				onClubClick={handleClubCLick}
				onCarClick={handleCarCLick}
			/>
		</View>
	);
};
