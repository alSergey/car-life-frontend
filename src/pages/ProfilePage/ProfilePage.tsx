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

interface Props {
	id: string;
	onClubClick: (clubId: number) => void;
	onEventClick: (eventId: number) => void;
	onCarClick: (carId: number) => void;
	onCreateCarClick: () => void;
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

export const ProfilePage: React.FC<Props> = ({
	id,
	onCarClick,
	onCreateCarClick,
	onClubClick,
	onEventClick,
}) => {
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
					onClick={onCarClick}
					onCreateClick={onCreateCarClick}
				/>
			)}
			{activeTab === UserTab.Event && (
				<UserEvent userId={userState.id} onClick={onEventClick} />
			)}
			{activeTab === UserTab.Club && (
				<UserClub userId={userState.id} onClick={onClubClick} />
			)}
		</Panel>
	);
};
