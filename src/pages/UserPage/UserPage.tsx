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
import {
	getUserPageQuery,
	redirectCarPage,
	redirectClubPage,
	redirectEventPage,
} from "../../router";
import { getUserData } from "./api";
import { useRouter } from "@happysanta/router";

interface Props {
	id: string;
	pagePrefix: string;
}

export const UserPage: React.FC<Props> = ({ id, pagePrefix }) => {
	const router = useRouter();
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
				separator={false}
				left={<PanelHeaderBack onClick={() => router.popPage()} />}
			/>
			<UserHeader userData={userData} />
			<UserBar activeTab={activeTab} setActiveTab={setActiveTab} />
			{activeTab === UserTab.Info && <UserInfo userData={userData} />}
			{activeTab === UserTab.Garage && (
				<UserGarage
					userId={userId}
					onClick={(carId) => redirectCarPage(router, pagePrefix, { carId })}
				/>
			)}
			{activeTab === UserTab.Event && (
				<UserEvent
					userId={userId}
					onClick={(eventId) =>
						redirectEventPage(router, pagePrefix, { eventId })
					}
				/>
			)}
			{activeTab === UserTab.Club && (
				<UserClub
					userId={userId}
					onClick={(clubId) => redirectClubPage(router, pagePrefix, { clubId })}
				/>
			)}
		</Panel>
	);
};
