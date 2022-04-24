import React, { useContext, useEffect } from "react";
import { View } from "@vkontakte/vkui";
import { ProfilePage } from "../../pages/ProfilePage";
import { ClubPage } from "../../pages/ClubPage";
import { EventPage } from "../../pages/EventPage";
import {
	PROFILE_PANEL,
	PROFILE_EVENT_PAGE,
	PROFILE_EVENT_PANEL,
	PROFILE_CLUB_PAGE,
	PROFILE_CLUB_PANEL,
	PROFILE_CAR_PAGE,
	PROFILE_CAR_PANEL,
	PROFILE_CREATE_CAR_PAGE,
	PROFILE_CREATE_CAR_PANEL,
	PROFILE_USER_PAGE,
	PROFILE_USER_PANEL,
	REG_WELCOME_PAGE,
	setEventPageQuery,
	setClubPageQuery,
	setCarPageQuery,
	setUserPageQuery,
} from "../../router";
import { UserPage } from "../../pages/UserPage";
import { CreateCarPage } from "../../pages/CreateCarPage";
import { CarPage } from "../../pages/CarPage";
import { UserContext } from "../../context/userContext";
import { useLocation, useRouter } from "@happysanta/router";

interface Props {
	id: string;
}

export const ProfileTab: React.FC<Props> = ({ id }) => {
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
		router.pushPage(PROFILE_USER_PAGE, setUserPageQuery(userId));
	};

	const handleClubCLick = (clubId: number): void => {
		router.pushPage(PROFILE_CLUB_PAGE, setClubPageQuery(clubId));
	};

	const handleEventCLick = (eventId: number): void => {
		router.pushPage(PROFILE_EVENT_PAGE, setEventPageQuery(eventId));
	};

	const handleCarCLick = (carId: number): void => {
		router.pushPage(PROFILE_CAR_PAGE, setCarPageQuery(carId));
	};

	return (
		<View
			id={id}
			history={location.getViewHistory(id)}
			onSwipeBack={handleBackClick}
			// @ts-ignore
			activePanel={location.getViewActivePanel(id)}
		>
			<ProfilePage
				id={PROFILE_PANEL}
				onCreateCarClick={() => router.pushPage(PROFILE_CREATE_CAR_PAGE)}
				onEventClick={handleEventCLick}
				onClubClick={handleClubCLick}
				onCarClick={handleCarCLick}
			/>
			<CreateCarPage
				id={PROFILE_CREATE_CAR_PANEL}
				onBackClick={handleBackClick}
				onSubmit={handleCarCLick}
			/>
			<ClubPage
				id={PROFILE_CLUB_PANEL}
				onBackClick={handleBackClick}
				onEventClick={handleEventCLick}
				onCarClick={handleCarCLick}
				onUserClick={handleUserCLick}
			/>
			<EventPage
				id={PROFILE_EVENT_PANEL}
				onBackClick={handleBackClick}
				onClubClick={handleClubCLick}
				onUserClick={handleUserCLick}
			/>
			<UserPage
				id={PROFILE_USER_PANEL}
				onBackClick={handleBackClick}
				onEventClick={handleEventCLick}
				onClubClick={handleClubCLick}
				onCarClick={handleCarCLick}
			/>
			<CarPage id={PROFILE_CAR_PANEL} onBackClick={handleBackClick} />
		</View>
	);
};
