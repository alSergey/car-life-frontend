import React, { useEffect, useState } from "react";
import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";
import {
	UserTab,
	UserGarage,
	UserEvent,
	UserClub,
	UserInfo,
	UserHeader,
	UserBar,
} from "../../components/UserPage";
import { defaultUserData } from "../../context/userContext";
import { getUserPageQuery } from "../../router";
import { getUserData } from "./api";

interface Props {
	id: string;
	onClubClick: (clubId: number) => void;
	onEventClick: (eventId: number) => void;
	onCarClick: (carId: number) => void;
	onBackClick?: () => void;
}

export const UserPage: React.FC<Props> = ({
	id,
	onBackClick,
	onCarClick,
	onClubClick,
	onEventClick,
}) => {
	const { userId } = getUserPageQuery();

	const [activeTab, setActiveTab] = useState(UserTab.Info);
	const [userData, setUserData] = useState(defaultUserData);

	const handleGetUserData = async (): Promise<void> => {
		try {
			const data = await getUserData(userId);
			setUserData(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		handleGetUserData();
	}, []);

	return (
		<Panel id={id}>
			<PanelHeader
				left={onBackClick && <PanelHeaderBack onClick={onBackClick} />}
			/>
			<UserHeader userData={userData} />
			<UserBar activeTab={activeTab} setActiveTab={setActiveTab} />
			{activeTab === UserTab.Info && <UserInfo userData={userData} />}
			{activeTab === UserTab.Garage && (
				<UserGarage userId={userId} onClick={onCarClick} />
			)}
			{activeTab === UserTab.Event && (
				<UserEvent userId={userId} onClick={onEventClick} />
			)}
			{activeTab === UserTab.Club && (
				<UserClub userId={userId} onClick={onClubClick} />
			)}
		</Panel>
	);
};
