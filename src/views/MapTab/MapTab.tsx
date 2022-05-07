import React, { ReactNode, useContext, useEffect, useState } from "react";
import { SplitLayout, View } from "@vkontakte/vkui";
import { EventPage } from "../../pages/EventPage";
import {
	MAP_PANEL,
	REG_WELCOME_PAGE,
	MAP_CREATE_EVENT_PANEL,
	MAP_CREATE_EVENT_PAGE,
	MAP_CLUB_PANEL,
	MAP_CLUB_PAGE,
	MAP_EVENT_PANEL,
	MAP_EVENT_PAGE,
	MAP_USER_PANEL,
	MAP_USER_PAGE,
	MAP_CAR_PANEL,
	MAP_CAR_PAGE,
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
import { CreateEventPage } from "../../pages/CreateEventPage";

interface Props {
	id: string;
}

export const MapTab: React.FC<Props> = ({ id }) => {
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

	const handleCreateEventCLick = (): void => {
		router.pushPage(MAP_CREATE_EVENT_PAGE);
	};

	const handleClubCLick = (clubId: number): void => {
		router.pushPage(MAP_CLUB_PAGE, setClubPageQuery(clubId));
	};

	const handleEventCLick = (eventId: number): void => {
		router.pushPage(MAP_EVENT_PAGE, setEventPageQuery(eventId));
	};

	const handleUserCLick = (userId: number): void => {
		router.pushPage(MAP_USER_PAGE, setUserPageQuery(userId));
	};

	const handleCarCLick = (carId: number): void => {
		router.pushPage(MAP_CAR_PAGE, setCarPageQuery(carId));
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
				<MapPage id={MAP_PANEL} onEventClick={handleEventCLick} />
				<CreateEventPage
					id={MAP_CREATE_EVENT_PANEL}
					onBackClick={handleBackClick}
					onSubmit={handleEventCLick}
				/>
				<EventPage
					id={MAP_EVENT_PANEL}
					setPopout={setPopout}
					onBackClick={handleBackClick}
					onClubClick={handleClubCLick}
					onUserClick={handleUserCLick}
				/>
				<ClubPage
					id={MAP_CLUB_PANEL}
					setPopout={setPopout}
					onBackClick={handleBackClick}
					onCreateEventClick={handleCreateEventCLick}
					onEventClick={handleEventCLick}
					onUserClick={handleUserCLick}
					onCarClick={handleCarCLick}
				/>
				<UserPage
					id={MAP_USER_PANEL}
					setPopout={setPopout}
					onBackClick={handleBackClick}
					onClubClick={handleClubCLick}
					onEventClick={handleEventCLick}
					onCarClick={handleCarCLick}
				/>
				<CarPage
					id={MAP_CAR_PANEL}
					setPopout={setPopout}
					onBackClick={handleBackClick}
				/>
			</View>
		</SplitLayout>
	);
};
