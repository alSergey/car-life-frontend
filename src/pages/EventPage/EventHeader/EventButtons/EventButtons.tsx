import React, { useState } from "react";
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
	const [loadingMember, setLoadingMember] = useState(false);
	const [loadingViewer, setLoadingViewer] = useState(false);

	const handleMember = async (): Promise<void> => {
		setLoadingMember(true);
		try {
			await newEventMember(eventId);
			onClick();
		} catch (err) {
			console.error(err);
		} finally {
			setLoadingMember(false);
		}
	};

	const handleViewer = async (): Promise<void> => {
		setLoadingViewer(true);
		try {
			await newEventViewer(eventId);
			onClick();
		} catch (err) {
			console.error(err);
		} finally {
			setLoadingViewer(false);
		}
	};

	return (
		<div className={styles.container}>
			{isShownEventMemberButton(userStatus) && (
				<Button
					size="m"
					stretched
					loading={loadingMember}
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
					loading={loadingViewer}
					disabled={isDisabledEventViewerButton(userStatus)}
					onClick={handleViewer}
				>
					{getEventViewerButtonText(userStatus)}
				</Button>
			)}
		</div>
	);
};
