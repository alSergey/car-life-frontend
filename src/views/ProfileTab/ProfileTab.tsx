import React from "react";
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
	PROFILE_CREATE_CAR_PAGE,
	PROFILE_USER_PAGE,
	PROFILE_USER_PANEL,
	setEventPageQuery,
	setClubPageQuery,
	setCarPageQuery,
	setUserPageQuery,
} from "../../router";
import { useLocation, useRouter } from "@happysanta/router";
import { UserPage } from "../../pages/UserPage";

interface Props {
	id: string;
}

export const ProfileTab: React.FC<Props> = ({ id }) => {
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
			<ProfilePage
				id={PROFILE_PANEL}
				onCreateCarClick={() => router.pushPage(PROFILE_CREATE_CAR_PAGE)}
				onEventClick={(clickEventId) =>
					router.pushPage(PROFILE_EVENT_PAGE, setEventPageQuery(clickEventId))
				}
				onClubClick={(clickClubId) =>
					router.pushPage(PROFILE_CLUB_PAGE, setClubPageQuery(clickClubId))
				}
				onCarClick={(clickCarId) =>
					router.pushPage(PROFILE_CAR_PAGE, setCarPageQuery(clickCarId))
				}
			/>
			<ClubPage
				id={PROFILE_CLUB_PANEL}
				onBackClick={() => router.popPage()}
				onEventClick={(clickEventId) =>
					router.pushPage(PROFILE_EVENT_PAGE, setEventPageQuery(clickEventId))
				}
				onCarClick={(clickCarId) =>
					router.pushPage(PROFILE_CAR_PAGE, setCarPageQuery(clickCarId))
				}
				onUserClick={(clickUserId) =>
					router.pushPage(PROFILE_USER_PAGE, setUserPageQuery(clickUserId))
				}
			/>
			<EventPage
				id={PROFILE_EVENT_PANEL}
				onBackClick={() => router.popPage()}
				onUserClick={(clickUserId) =>
					router.pushPage(PROFILE_USER_PAGE, setUserPageQuery(clickUserId))
				}
			/>
			<UserPage
				id={PROFILE_USER_PANEL}
				onBackClick={() => router.popPage()}
				onEventClick={(clickEventId) =>
					router.pushPage(PROFILE_EVENT_PAGE, setEventPageQuery(clickEventId))
				}
				onClubClick={(clickClubId) =>
					router.pushPage(PROFILE_CLUB_PAGE, setClubPageQuery(clickClubId))
				}
				onCarClick={(clickCarId) =>
					router.pushPage(PROFILE_CAR_PAGE, setCarPageQuery(clickCarId))
				}
			/>
		</View>
	);
};
