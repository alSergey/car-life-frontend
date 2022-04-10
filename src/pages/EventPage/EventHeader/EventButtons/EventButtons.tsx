import React, { useState } from "react";
import { Button } from "@vkontakte/vkui";

import styles from "./EventButtons.module.css";
import { getEventChatLink, newEventMember, newEventViewer } from "./api";
import {
	getEventMemberButtonText,
	getEventViewerButtonText,
	isDisabledEventMemberButton,
	isDisabledEventViewerButton,
	isShownEventMemberButton,
	isShownEventMessagesButton,
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

	const handleGetChatLink = async (): Promise<void> => {
		try {
			const chatLink = await getEventChatLink(eventId);
			window.open(chatLink);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className={styles.container}>
			{isShownEventMessagesButton(userStatus) && (
				<Button size="m" stretched onClick={handleGetChatLink}>
					Беседа события
				</Button>
			)}
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
