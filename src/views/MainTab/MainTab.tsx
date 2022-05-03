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
	MAIN_CAR_PANEL,
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
import { CarPage } from "../../pages/CarPage";

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

	const handleBackClick = (): void => {
		router.popPage();
	};

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

	const handleCreateEventCLick = (): void => {
		router.pushPage(MAIN_CREATE_EVENT_PAGE);
	};

	const handleCreateClubCLick = (): void => {
		router.pushPage(MAIN_CREATE_CLUB_PAGE);
	};

	return (
		<View
			id={id}
			history={location.getViewHistory(id)}
			onSwipeBack={handleBackClick}
			// @ts-ignore
			activePanel={location.getViewActivePanel(id)}
		>
			<MainListPage
				id={MAIN_PANEL}
				onEventClick={handleEventCLick}
				onClubClick={handleClubCLick}
				onEventCreateClick={handleCreateEventCLick}
				onClubCreateClick={handleCreateClubCLick}
			/>
			<CreateEventPage
				id={MAIN_CREATE_EVENT_PANEL}
				onBackClick={handleBackClick}
				onSubmit={handleEventCLick}
			/>
			<CreateClubPage
				id={MAIN_CREATE_CLUB_PANEL}
				onBackClick={handleBackClick}
				onSubmit={handleClubCLick}
			/>
			<EventPage
				id={MAIN_EVENT_PANEL}
				onBackClick={handleBackClick}
				onClubClick={handleClubCLick}
				onUserClick={handleUserCLick}
			/>
			<ClubPage
				id={MAIN_CLUB_PANEL}
				onBackClick={handleBackClick}
				onEventClick={handleEventCLick}
				onUserClick={handleUserCLick}
				onCarClick={handleCarCLick}
				onCreateEventClick={handleCreateEventCLick}
			/>
			<UserPage
				id={MAIN_USER_PANEL}
				onBackClick={handleBackClick}
				onEventClick={handleEventCLick}
				onClubClick={handleClubCLick}
				onCarClick={handleCarCLick}
			/>
			<CarPage id={MAIN_CAR_PANEL} onBackClick={handleBackClick} />
		</View>
	);
};
