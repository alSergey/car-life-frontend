import React, { useState } from "react";
import { Button } from "@vkontakte/vkui";

import styles from "./EventButtons.module.css";
import {
	getEventChatLink,
	leaveEvent,
	newEventMember,
	newEventViewer,
} from "./api";
import {
	isShownEventMessagesButton,
	isShownEventMemberRequestButton,
	isShownEventMemberButton,
	getEventMemberButtonText,
	isShownEventViewerButton,
	getEventViewerButtonText,
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
	const [loadingLeave, setLoadingLeave] = useState(false);

	const handleGetChatLink = async (): Promise<void> => {
		try {
			const chatLink = await getEventChatLink(eventId);
			window.open(chatLink);
		} catch (err) {
			console.error(err);
		}
	};

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

	const handleLeaveEvent = async (): Promise<void> => {
		setLoadingLeave(true);
		try {
			await leaveEvent(eventId);
			onClick();
		} catch (err) {
			console.error(err);
		} finally {
			setLoadingLeave(false);
		}
	};

	return (
		<div className={styles.container}>
			{isShownEventMessagesButton(userStatus) && (
				<Button size="m" stretched mode="outline" onClick={handleGetChatLink}>
					Беседа события
				</Button>
			)}
			{isShownEventMemberRequestButton(userStatus) && (
				<Button size="m" stretched disabled>
					Обработка администратором
				</Button>
			)}
			{isShownEventMemberButton(userStatus) && (
				<Button
					size="m"
					stretched
					loading={loadingMember || loadingLeave}
					disabled={loadingMember || loadingLeave}
					onClick={() => {
						if (userStatus === "participant") {
							handleLeaveEvent();
							return;
						}

						handleMember();
					}}
				>
					{getEventMemberButtonText(userStatus)}
				</Button>
			)}
			{isShownEventViewerButton(userStatus) && (
				<Button
					size="m"
					stretched
					mode="secondary"
					loading={loadingViewer || loadingLeave}
					disabled={loadingViewer || loadingLeave}
					onClick={() => {
						if (userStatus === "spectator") {
							handleLeaveEvent();
							return;
						}

						handleViewer();
					}}
				>
					{getEventViewerButtonText(userStatus)}
				</Button>
			)}
		</div>
	);
};
