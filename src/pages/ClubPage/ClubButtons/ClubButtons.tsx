import React from "react";
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
	const handleMember = async (): Promise<void> => {
		try {
			await newClubMember(clubId);
			onClick();
		} catch (err) {
			console.error(err);
		}
	};

	const handleSubscriber = async (): Promise<void> => {
		try {
			await newClubSubscriber(clubId);
			onClick();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className={styles.container}>
			{isShownClubMemberButton(userStatus) && (
				<Button
					size="m"
					stretched
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
					disabled={isDisabledClubSubscriberButton(userStatus)}
					onClick={handleSubscriber}
				>
					{getClubSubscriberButtonText(userStatus)}
				</Button>
			)}
		</div>
	);
};
