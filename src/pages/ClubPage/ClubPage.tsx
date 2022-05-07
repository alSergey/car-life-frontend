import React, { Fragment, ReactNode, useEffect, useState } from "react";
import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	PanelHeaderButton,
} from "@vkontakte/vkui";
import { Icon28MoreHorizontal } from "@vkontakte/icons";

import { emptyClubData, getClub } from "./api";
import { ClubActionMenu } from "./ClubActionMenu";
import { ClubHeader } from "./ClubHeader";
import { ClubBar, ClubTab } from "./ClubBar";
import { ClubEvents } from "./ClubEvents";
import { ClubGarage } from "./ClubGarage";
import { ClubMembers } from "./ClubMembers";
import { ClubSubscribers } from "./ClubSubscribers";
import { getClubPageQuery } from "../../router";

interface Props {
	id: string;
	setPopout: (popout: ReactNode | null) => void;
	onBackClick: () => void;
	onEventClick: (eventId: number) => void;
	onCarClick: (carId: number) => void;
	onUserClick: (userId: number) => void;
	onCreateEventClick: (clubId: number) => void;
}

export const ClubPage: React.FC<Props> = ({
	id,
	setPopout,
	onBackClick,
	onUserClick,
	onCarClick,
	onEventClick,
	onCreateEventClick,
}) => {
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

	const openPopout = () => {
		setPopout(
			<ClubActionMenu
				clubId={clubId}
				userStatus={clubData.userStatus}
				onClose={() => setPopout(null)}
			/>
		);
	};

	return (
		<Panel id={id}>
			<PanelHeader
				left={
					<Fragment>
						<PanelHeaderBack onClick={onBackClick} />
						<PanelHeaderButton aria-label="Меню">
							<Icon28MoreHorizontal onClick={openPopout} />
						</PanelHeaderButton>
					</Fragment>
				}
			>
				{clubData.name}
			</PanelHeader>
			<ClubHeader clubData={clubData} onButtonClick={handleGetClubData} />
			<ClubBar activeTab={activeTab} setActiveTab={setActiveTab} />
			{activeTab === ClubTab.Events && (
				<ClubEvents
					clubId={clubId}
					userStatus={clubData.userStatus}
					onClick={onEventClick}
					onCreateClick={() => onCreateEventClick(clubId)}
				/>
			)}
			{activeTab === ClubTab.Garage && (
				<ClubGarage clubId={clubId} onClick={onCarClick} />
			)}
			{activeTab === ClubTab.Members && (
				<ClubMembers
					clubId={clubId}
					owner={clubData.owner}
					membersCount={clubData.counters.members}
					userStatus={clubData.userStatus}
					onClick={onUserClick}
				/>
			)}
			{activeTab === ClubTab.Subscribers && (
				<ClubSubscribers
					clubId={clubId}
					subscribersCount={clubData.counters.subscribers}
					onClick={onUserClick}
				/>
			)}
		</Panel>
	);
};
