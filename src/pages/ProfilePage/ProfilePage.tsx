import React, { useContext, useState } from "react";
import { Panel } from "@vkontakte/vkui";
import {
	UserBar,
	UserClub,
	UserEvent,
	UserGarage,
	UserHeader,
	UserInfo,
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

export const ProfilePage: React.FC<Props> = ({
	id,
	onCarClick,
	onCreateCarClick,
	onClubClick,
	onEventClick,
}) => {
	const [activeTab, setActiveTab] = useState(UserTab.Info);
	const { userState } = useContext(UserContext);

	return (
		<Panel id={id}>
			<UserHeader userData={userState} />
			<UserBar activeTab={activeTab} setActiveTab={setActiveTab} />
			{activeTab === UserTab.Info && <UserInfo userData={userState} />}
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
