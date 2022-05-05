import React, { useEffect, useState } from "react";
import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";

import { emptyClubData, getClub } from "./api";
import { ClubHeader } from "./ClubHeader";
import { ClubBar, ClubTab } from "./ClubBar";
import { ClubEvents } from "./ClubEvents";
import { ClubGarage } from "./ClubGarage";
import { ClubMembers } from "./ClubMembers";
import { ClubSubscribers } from "./ClubSubscribers";
import {
	getClubPageQuery,
	redirectCreateEventPage,
	redirectCarPage,
	redirectEventPage,
	redirectUserPage,
} from "../../router";
import { useRouter } from "@happysanta/router";

interface Props {
	id: string;
	pagePrefix: string;
}

export const ClubPage: React.FC<Props> = ({ id, pagePrefix }) => {
	const router = useRouter();
	const { clubId } = getClubPageQuery();

	const [activeTab, setActiveTab] = useState(ClubTab.Events);
	const [clubData, setClubData] = useState(emptyClubData);

	const handleGetClubData = async (): Promise<void> => {
		try {
			const data = await getClub(clubId);
			setClubData(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		handleGetClubData();
	}, []);

	return (
		<Panel id={id}>
			<PanelHeader left={<PanelHeaderBack onClick={() => router.popPage()} />}>
				{clubData.name}
			</PanelHeader>
			<ClubHeader clubData={clubData} onButtonClick={handleGetClubData} />
			<ClubBar activeTab={activeTab} setActiveTab={setActiveTab} />
			{activeTab === ClubTab.Events && (
				<ClubEvents
					clubId={clubId}
					userStatus={clubData.userStatus}
					onCreateClick={() => redirectCreateEventPage(router, pagePrefix)}
					onClick={(eventId) =>
						redirectEventPage(router, pagePrefix, { eventId })
					}
				/>
			)}
			{activeTab === ClubTab.Garage && (
				<ClubGarage
					clubId={clubId}
					onClick={(carId) => redirectCarPage(router, pagePrefix, { carId })}
				/>
			)}
			{activeTab === ClubTab.Members && (
				<ClubMembers
					clubId={clubId}
					userStatus={clubData.userStatus}
					onClick={(userId) => redirectUserPage(router, pagePrefix, { userId })}
				/>
			)}
			{activeTab === ClubTab.Subscribers && (
				<ClubSubscribers
					clubId={clubId}
					onClick={(userId) => redirectUserPage(router, pagePrefix, { userId })}
				/>
			)}
		</Panel>
	);
};
