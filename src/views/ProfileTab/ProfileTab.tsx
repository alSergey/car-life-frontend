import React, { ReactNode, useContext, useEffect, useState } from "react";
import { SplitLayout, View } from "@vkontakte/vkui";
import { ProfilePage } from "../../pages/ProfilePage";
import { ClubPage } from "../../pages/ClubPage";
import { EventPage } from "../../pages/EventPage";
import {
	PROFILE_PANEL,
	REG_WELCOME_PAGE,
	PROFILE_CREATE_CLUB_PANEL,
	PROFILE_CREATE_CLUB_PAGE,
	PROFILE_CREATE_EVENT_PANEL,
	PROFILE_CREATE_EVENT_PAGE,
	PROFILE_CREATE_CAR_PANEL,
	PROFILE_CREATE_CAR_PAGE,
	PROFILE_CLUB_PANEL,
	PROFILE_CLUB_PAGE,
	PROFILE_EVENT_PANEL,
	PROFILE_EVENT_PAGE,
	PROFILE_USER_PANEL,
	PROFILE_USER_PAGE,
	PROFILE_CAR_PANEL,
	PROFILE_CAR_PAGE,
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
import { CreateEventPage } from "../../pages/CreateEventPage";
import { CreateClubPage } from "../../pages/CreateClubPage";

interface Props {
	id: string;
}

export const ProfileTab: React.FC<Props> = ({ id }) => {
	const location = useLocation();
	const router = useRouter();

	const [popout, setPopout] = useState<ReactNode | null>(null);
	const { isLoggedIn } = useContext(UserContext);

	useEffect(() => {
		if (isLoggedIn === false) return router.pushPage(REG_WELCOME_PAGE);
	}, []);

	const handleBackClick = (): void => {
		router.popPage();
	};

	const handleCreateClubCLick = (): void => {
		router.pushPage(PROFILE_CREATE_CLUB_PAGE);
	};

	const handleCreateEventCLick = (): void => {
		router.pushPage(PROFILE_CREATE_EVENT_PAGE);
	};

	const handleCreateCarCLick = (): void => {
		router.pushPage(PROFILE_CREATE_CAR_PAGE);
	};

	const handleClubCLick = (clubId: number): void => {
		router.pushPage(PROFILE_CLUB_PAGE, setClubPageQuery(clubId));
	};

	const handleEventCLick = (eventId: number): void => {
		router.pushPage(PROFILE_EVENT_PAGE, setEventPageQuery(eventId));
	};

	const handleUserCLick = (userId: number): void => {
		router.pushPage(PROFILE_USER_PAGE, setUserPageQuery(userId));
	};

	const handleCarCLick = (carId: number): void => {
		router.pushPage(PROFILE_CAR_PAGE, setCarPageQuery(carId));
	};

	return (
		<SplitLayout popout={popout}>
			<View
				id={id}
				history={location.getViewHistory(id)}
				onSwipeBack={handleBackClick}
				// @ts-ignore
				activePanel={location.getViewActivePanel(id)}
			>
				<ProfilePage
					id={PROFILE_PANEL}
					onCreateClubClick={handleCreateClubCLick}
					onCreateEventClick={handleCreateEventCLick}
					onCreateCarClick={handleCreateCarCLick}
					onClubClick={handleClubCLick}
					onEventClick={handleEventCLick}
					onCarClick={handleCarCLick}
				/>
				<CreateClubPage
					id={PROFILE_CREATE_CLUB_PANEL}
					onBackClick={handleBackClick}
					onSubmit={handleClubCLick}
				/>
				<CreateEventPage
					id={PROFILE_CREATE_EVENT_PANEL}
					onBackClick={handleBackClick}
					onSubmit={handleEventCLick}
				/>
				<CreateCarPage
					id={PROFILE_CREATE_CAR_PANEL}
					onBackClick={handleBackClick}
					onSubmit={handleCarCLick}
				/>
				<ClubPage
					id={PROFILE_CLUB_PANEL}
					setPopout={setPopout}
					onBackClick={handleBackClick}
					onCreateEventClick={handleCreateEventCLick}
					onEventClick={handleEventCLick}
					onUserClick={handleUserCLick}
					onCarClick={handleCarCLick}
				/>
				<EventPage
					id={PROFILE_EVENT_PANEL}
					setPopout={setPopout}
					onBackClick={handleBackClick}
					onClubClick={handleClubCLick}
					onUserClick={handleUserCLick}
				/>
				<UserPage
					id={PROFILE_USER_PANEL}
					setPopout={setPopout}
					onBackClick={handleBackClick}
					onClubClick={handleClubCLick}
					onEventClick={handleEventCLick}
					onCarClick={handleCarCLick}
				/>
				<CarPage
					id={PROFILE_CAR_PANEL}
					setPopout={setPopout}
					onBackClick={handleBackClick}
				/>
			</View>
		</SplitLayout>
	);
};
