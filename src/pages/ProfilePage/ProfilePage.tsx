import React, { useContext, useState } from "react";
import { Panel, PanelHeader } from "@vkontakte/vkui";
import {
	UserBar,
	UserClub,
	UserEvent,
	UserGarage,
	UserHeader,
	UserInfo,
	UserInfoEdit,
} from "../../components/UserPage";
import { UserContext } from "../../context/userContext";
import { useRouter } from "@happysanta/router";
import {
	redirectCarPage,
	redirectClubPage,
	redirectCreateCarPage,
	redirectEventPage,
} from "../../router";

interface Props {
	id: string;
	pagePrefix: string;
}

export enum UserTab {
	Info = "info",
	Garage = "garage",
	Club = "club",
	Event = "event",
}

export enum UserInfoTab {
	Info = "info",
	Edit = "edit",
}

export const ProfilePage: React.FC<Props> = ({ id, pagePrefix }) => {
	const router = useRouter();

	const [activeTab, setActiveTab] = useState(UserTab.Info);
	const [infoTab, setInfoTab] = useState(UserInfoTab.Info);
	const { userState, refreshUserState } = useContext(UserContext);

	return (
		<Panel id={id}>
			<PanelHeader separator={false} />
			<UserHeader userData={userState} />
			<UserBar activeTab={activeTab} setActiveTab={setActiveTab} />
			{activeTab === UserTab.Info && infoTab === UserInfoTab.Info && (
				<UserInfo
					userData={userState}
					onEditClick={() => setInfoTab(UserInfoTab.Edit)}
				/>
			)}
			{activeTab === UserTab.Info && infoTab === UserInfoTab.Edit && (
				<UserInfoEdit
					userData={userState}
					onClick={() => setInfoTab(UserInfoTab.Info)}
					onUpdate={() => {
						refreshUserState();
						setInfoTab(UserInfoTab.Info);
					}}
				/>
			)}
			{activeTab === UserTab.Garage && (
				<UserGarage
					userId={userState.id}
					onCreateClick={() => redirectCreateCarPage(router, pagePrefix)}
					onClick={(carId) => redirectCarPage(router, pagePrefix, { carId })}
				/>
			)}
			{activeTab === UserTab.Event && (
				<UserEvent
					userId={userState.id}
					onClick={(eventId) =>
						redirectEventPage(router, pagePrefix, { eventId })
					}
				/>
			)}
			{activeTab === UserTab.Club && (
				<UserClub
					userId={userState.id}
					onClick={(clubId) => redirectClubPage(router, pagePrefix, { clubId })}
				/>
			)}
		</Panel>
	);
};
