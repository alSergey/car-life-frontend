import React from "react";
import { ActionSheet, ActionSheetItem } from "@vkontakte/vkui";
import { complainEvent, deleteEvent } from "./api";

interface Props {
	eventId: number;
	userStatus: string;
	onClose: () => void;
}

export const EventActionMenu: React.FC<Props> = ({
	eventId,
	userStatus,
	onClose,
}) => {
	const handleDelete = async (): Promise<void> => {
		try {
			await deleteEvent(eventId);
			onClose();
		} catch (err) {
			console.error(err);
		}
	};

	const handleComplain = async (): Promise<void> => {
		try {
			await complainEvent(eventId);
			onClose();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<ActionSheet
			onClose={onClose}
			iosCloseItem={
				<ActionSheetItem autoclose mode="cancel">
					Отменить
				</ActionSheetItem>
			}
		>
			{userStatus !== "admin" && (
				<ActionSheetItem autoclose onClick={handleComplain}>
					Пожаловаться
				</ActionSheetItem>
			)}
			{userStatus === "admin" && (
				<ActionSheetItem autoclose mode="destructive" onClick={handleDelete}>
					Удалить
				</ActionSheetItem>
			)}
		</ActionSheet>
	);
};
