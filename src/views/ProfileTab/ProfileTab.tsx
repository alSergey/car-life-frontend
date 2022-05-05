import React, { useContext, useEffect } from "react";
import { View } from "@vkontakte/vkui";
import { ProfilePage } from "../../pages/ProfilePage";
import { ClubPage } from "../../pages/ClubPage";
import { EventPage } from "../../pages/EventPage";
import {
	PROFILE_PANEL,
	PROFILE_PAGE_PREFIX,
	REG_WELCOME_PAGE,
	PROFILE_EVENT_PANEL,
	PROFILE_CLUB_PANEL,
	PROFILE_CAR_PANEL,
	PROFILE_CREATE_CAR_PANEL,
	PROFILE_USER_PANEL,
	PROFILE_CREATE_EVENT_PANEL,
} from "../../router";
import { UserPage } from "../../pages/UserPage";
import { CreateCarPage } from "../../pages/CreateCarPage";
import { CarPage } from "../../pages/CarPage";
import { UserContext } from "../../context/userContext";
import { useLocation, useRouter } from "@happysanta/router";
import { CreateEventPage } from "../../pages/CreateEventPage";

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

	return (
		<View
			id={id}
			history={location.getViewHistory(id)}
			onSwipeBack={() => router.popPage()}
			// @ts-ignore
			activePanel={location.getViewActivePanel(id)}
		>
			<ProfilePage id={PROFILE_PANEL} pagePrefix={PROFILE_PAGE_PREFIX} />
			<CreateEventPage
				id={PROFILE_CREATE_EVENT_PANEL}
				pagePrefix={PROFILE_PAGE_PREFIX}
			/>
			<CreateCarPage
				id={PROFILE_CREATE_CAR_PANEL}
				pagePrefix={PROFILE_PAGE_PREFIX}
			/>
			<ClubPage id={PROFILE_CLUB_PANEL} pagePrefix={PROFILE_PAGE_PREFIX} />
			<EventPage id={PROFILE_EVENT_PANEL} pagePrefix={PROFILE_PAGE_PREFIX} />
			<UserPage id={PROFILE_USER_PANEL} pagePrefix={PROFILE_PAGE_PREFIX} />
			<CarPage id={PROFILE_CAR_PANEL} pagePrefix={PROFILE_PAGE_PREFIX} />
		</View>
	);
};
