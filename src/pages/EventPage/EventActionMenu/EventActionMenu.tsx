import React from "react";
import { ActionSheet, ActionSheetItem } from "@vkontakte/vkui";
import {
	CREATE_EVENT_COMPLAIN_MODAL,
	setCreateEventComplainModalQuery,
} from "../../../router";
import { useRouter } from "@happysanta/router";
import { deleteEvent } from "./api";

interface Props {
	eventId: number;
	userStatus: string;
	onClose: () => void;
	onDelete: () => void;
}

export const EventActionMenu: React.FC<Props> = ({
	eventId,
	userStatus,
	onClose,
	onDelete,
}) => {
	const router = useRouter();

	const handleDeleteEvent = async (): Promise<void> => {
		try {
			await deleteEvent(eventId);
			onClose();
			onDelete();
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
				<ActionSheetItem
					autoclose
					onClick={() => {
						router.pushModal(
							CREATE_EVENT_COMPLAIN_MODAL,
							setCreateEventComplainModalQuery(eventId)
						);
					}}
				>
					Пожаловаться
				</ActionSheetItem>
			)}
			{userStatus === "admin" && (
				<ActionSheetItem
					autoclose
					mode="destructive"
					onClick={handleDeleteEvent}
				>
					Удалить
				</ActionSheetItem>
			)}
		</ActionSheet>
	);
};
