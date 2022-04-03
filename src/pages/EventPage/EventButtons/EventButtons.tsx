import React from "react";
import { Button } from "@vkontakte/vkui";

import styles from "./EventButtons.module.css";
import { newEventMember, newEventViewer } from "./api";
import {
	getEventMemberButtonText,
	getEventViewerButtonText,
	isDisabledEventMemberButton,
	isDisabledEventViewerButton,
	isShownEventMemberButton,
	isShownEventViewerButton,
} from "./EventButtons.utils";

interface Props {
	eventId: number;
	userStatus: string;
	onClick: () => void;
}

export const EventButtons: React.FC<Props> = ({
	eventId,
	userStatus,
	onClick,
}) => {
	const handleMember = async (): Promise<void> => {
		try {
			await newEventMember(eventId);
			onClick();
		} catch (err) {
			console.error(err);
		}
	};

	const handleViewer = async (): Promise<void> => {
		try {
			await newEventViewer(eventId);
			onClick();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className={styles.container}>
			{isShownEventMemberButton(userStatus) && (
				<Button
					size="m"
					stretched
					disabled={isDisabledEventMemberButton(userStatus)}
					onClick={handleMember}
				>
					{getEventMemberButtonText(userStatus)}
				</Button>
			)}
			{isShownEventViewerButton(userStatus) && (
				<Button
					size="m"
					stretched
					mode="secondary"
					disabled={isDisabledEventViewerButton(userStatus)}
					onClick={handleViewer}
				>
					{getEventViewerButtonText(userStatus)}
				</Button>
			)}
		</div>
	);
};
