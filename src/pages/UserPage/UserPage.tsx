import React, { Fragment, ReactNode, useEffect, useState } from "react";
import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	PanelHeaderButton,
} from "@vkontakte/vkui";
import { Icon28MoreHorizontal } from "@vkontakte/icons";
import { UserActionMenu } from "./UserActionMenu";
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
	setPopout: (popout: ReactNode | null) => void;
	onBackClick: () => void;
	onClubClick: (clubId: number) => void;
	onEventClick: (eventId: number) => void;
	onCarClick: (carId: number) => void;
}

export const UserPage: React.FC<Props> = ({
	id,
	setPopout,
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

	const openPopout = () => {
		setPopout(
			<UserActionMenu userId={userId} onClose={() => setPopout(null)} />
		);
	};

	return (
		<Panel id={id}>
			<PanelHeader
				before={
					<Fragment>
						<PanelHeaderBack onClick={onBackClick} />
						<PanelHeaderButton aria-label="Меню">
							<Icon28MoreHorizontal onClick={openPopout} />
						</PanelHeaderButton>
					</Fragment>
				}
				separator={false}
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
