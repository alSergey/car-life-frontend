import React, { useState } from "react";
import { Button } from "@vkontakte/vkui";

import styles from "./ClubButtons.module.css";
import {
	getClubChatLink,
	leaveClub,
	newClubMember,
	newClubSubscriber,
} from "./api";
import {
	isShownClubMessagesButton,
	isShownClubMemberRequestButton,
	isShownClubMemberButton,
	getClubMemberButtonText,
	isShownClubSubscriberButton,
	getClubSubscriberButtonText,
} from "./ClubButtons.utils";

interface Props {
	clubId: number;
	userStatus: string;
	onClick: () => void;
}

export const ClubButtons: React.FC<Props> = ({
	clubId,
	userStatus,
	onClick,
}) => {
	const [loadingMember, setLoadingMember] = useState(false);
	const [loadingSubscriber, setLoadingSubscriber] = useState(false);
	const [loadingLeave, setLoadingLeave] = useState(false);

	const handleGetChatLink = async (): Promise<void> => {
		try {
			const chatLink = await getClubChatLink(clubId);
			window.open(chatLink);
		} catch (err) {
			console.error(err);
		}
	};

	const handleMember = async (): Promise<void> => {
		setLoadingMember(true);
		try {
			await newClubMember(clubId);
			onClick();
		} catch (err) {
			console.error(err);
		} finally {
			setLoadingMember(false);
		}
	};

	const handleSubscriber = async (): Promise<void> => {
		setLoadingSubscriber(true);
		try {
			await newClubSubscriber(clubId);
			onClick();
		} catch (err) {
			console.error(err);
		} finally {
			setLoadingSubscriber(false);
		}
	};

	const handleLeaveClub = async (): Promise<void> => {
		setLoadingLeave(true);
		try {
			await leaveClub(clubId);
			onClick();
		} catch (err) {
			console.error(err);
		} finally {
			setLoadingLeave(false);
		}
	};

	return (
		<div className={styles.container}>
			{isShownClubMessagesButton(userStatus) && (
				<Button size="m" stretched mode="outline" onClick={handleGetChatLink}>
					Беседа клуба
				</Button>
			)}
			{isShownClubMemberRequestButton(userStatus) && (
				<Button size="m" stretched disabled>
					Обработка администратором
				</Button>
			)}
			{isShownClubMemberButton(userStatus) && (
				<Button
					size="m"
					stretched
					loading={loadingMember || loadingLeave}
					disabled={loadingMember || loadingLeave}
					onClick={() => {
						if (userStatus === "participant") {
							handleLeaveClub();
							return;
						}

						handleMember();
					}}
				>
					{getClubMemberButtonText(userStatus)}
				</Button>
			)}
			{isShownClubSubscriberButton(userStatus) && (
				<Button
					size="m"
					stretched
					mode="secondary"
					loading={loadingSubscriber || loadingLeave}
					disabled={loadingSubscriber || loadingLeave}
					onClick={() => {
						if (userStatus === "subscriber") {
							handleLeaveClub();
							return;
						}

						handleSubscriber();
					}}
				>
					{getClubSubscriberButtonText(userStatus)}
				</Button>
			)}
		</div>
	);
};
