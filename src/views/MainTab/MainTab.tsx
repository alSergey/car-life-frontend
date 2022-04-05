import React from "react";
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
	setEventPageQuery,
	setClubPageQuery,
	setUserPageQuery,
	setCarPageQuery,
} from "../../router";
import { useLocation, useRouter } from "@happysanta/router";

interface Props {
	id: string;
}

export const MainTab: React.FC<Props> = ({ id }) => {
	const location = useLocation();
	const router = useRouter();

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
				onEventClick={(clickEventId) =>
					router.pushPage(MAIN_EVENT_PAGE, setEventPageQuery(clickEventId))
				}
				onClubCreateClick={() => router.pushPage(MAIN_CREATE_CLUB_PAGE)}
				onClubClick={(clickClubId) =>
					router.pushPage(MAIN_CLUB_PAGE, setClubPageQuery(clickClubId))
				}
			/>
			<CreateEventPage
				id={MAIN_CREATE_EVENT_PANEL}
				onBackClick={() => router.popPage()}
				onSubmit={(clickEventId) =>
					router.pushPage(MAIN_EVENT_PAGE, setEventPageQuery(clickEventId))
				}
			/>
			<EventPage
				id={MAIN_EVENT_PANEL}
				onBackClick={() => router.popPage()}
				onUserClick={(clickUserId) =>
					router.pushPage(MAIN_USER_PAGE, setUserPageQuery(clickUserId))
				}
			/>
			<CreateClubPage
				id={MAIN_CREATE_CLUB_PANEL}
				onBackClick={() => router.popPage()}
				onSubmit={(clickClubId) =>
					router.pushPage(MAIN_CLUB_PAGE, setClubPageQuery(clickClubId))
				}
			/>
			<ClubPage
				id={MAIN_CLUB_PANEL}
				onBackClick={() => router.popPage()}
				onEventClick={(clickEventId) =>
					router.pushPage(MAIN_EVENT_PAGE, setEventPageQuery(clickEventId))
				}
				onUserClick={(clickUserId) =>
					router.pushPage(MAIN_USER_PAGE, setUserPageQuery(clickUserId))
				}
				onCarClick={(clickCarId) =>
					router.pushPage(MAIN_CAR_PAGE, setCarPageQuery(clickCarId))
				}
			/>
			<UserPage
				id={MAIN_USER_PANEL}
				onBackClick={() => router.popPage()}
				onEventClick={(clickEventId) =>
					router.pushPage(MAIN_EVENT_PAGE, setEventPageQuery(clickEventId))
				}
				onClubClick={(clickClubId) =>
					router.pushPage(MAIN_CLUB_PAGE, setClubPageQuery(clickClubId))
				}
				onCarClick={(clickCarId) =>
					router.pushPage(MAIN_CAR_PAGE, setCarPageQuery(clickCarId))
				}
			/>
		</View>
	);
};
