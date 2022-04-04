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
	const [loading, setLoading] = useState(false);

	const handleMember = async (): Promise<void> => {
		setLoading(true);
		try {
			await newEventMember(eventId);
			onClick();
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const handleViewer = async (): Promise<void> => {
		setLoading(true);
		try {
			await newEventViewer(eventId);
			onClick();
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.container}>
			{isShownEventMemberButton(userStatus) && (
				<Button
					size="m"
					stretched
					loading={loading}
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
					loading={loading}
					disabled={isDisabledEventViewerButton(userStatus)}
					onClick={handleViewer}
				>
					{getEventViewerButtonText(userStatus)}
				</Button>
			)}
		</div>
	);
};
