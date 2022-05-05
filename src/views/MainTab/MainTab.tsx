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
	MAIN_PAGE_PREFIX,
	REG_WELCOME_PAGE,
	MAIN_CLUB_PANEL,
	MAIN_EVENT_PANEL,
	MAIN_CAR_PANEL,
	MAIN_CREATE_CLUB_PANEL,
	MAIN_CREATE_EVENT_PANEL,
	MAIN_USER_PANEL,
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

	return (
		<View
			id={id}
			history={location.getViewHistory(id)}
			onSwipeBack={() => router.popPage()}
			// @ts-ignore
			activePanel={location.getViewActivePanel(id)}
		>
			<MainListPage id={MAIN_PANEL} pagePrefix={MAIN_PAGE_PREFIX} />
			<CreateEventPage
				id={MAIN_CREATE_EVENT_PANEL}
				pagePrefix={MAIN_PAGE_PREFIX}
			/>
			<CreateClubPage
				id={MAIN_CREATE_CLUB_PANEL}
				pagePrefix={MAIN_PAGE_PREFIX}
			/>
			<ClubPage id={MAIN_CLUB_PANEL} pagePrefix={MAIN_PAGE_PREFIX} />
			<EventPage id={MAIN_EVENT_PANEL} pagePrefix={MAIN_PAGE_PREFIX} />
			<UserPage id={MAIN_USER_PANEL} pagePrefix={MAIN_PAGE_PREFIX} />
			<CarPage id={MAIN_CAR_PANEL} pagePrefix={MAIN_PAGE_PREFIX} />
		</View>
	);
};
