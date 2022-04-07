import React, { useState } from "react";
import { Button } from "@vkontakte/vkui";

import styles from "./ClubButtons.module.css";
import { newClubMember, newClubSubscriber } from "./api";
import {
	getClubMemberButtonText,
	getClubSubscriberButtonText,
	isDisabledClubMemberButton,
	isDisabledClubSubscriberButton,
	isShownClubMemberButton,
	isShownClubSubscriberButton,
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

	return (
		<div className={styles.container}>
			{isShownClubMemberButton(userStatus) && (
				<Button
					size="m"
					stretched
					loading={loadingMember}
					disabled={isDisabledClubMemberButton(userStatus)}
					onClick={handleMember}
				>
					{getClubMemberButtonText(userStatus)}
				</Button>
			)}
			{isShownClubSubscriberButton(userStatus) && (
				<Button
					size="m"
					stretched
					mode="secondary"
					loading={loadingSubscriber}
					disabled={isDisabledClubSubscriberButton(userStatus)}
					onClick={handleSubscriber}
				>
					{getClubSubscriberButtonText(userStatus)}
				</Button>
			)}
		</div>
	);
};