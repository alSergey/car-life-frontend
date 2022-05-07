import React from "react";
import { ActionSheet, ActionSheetItem } from "@vkontakte/vkui";
import { deleteEventPost, complainEventPost } from "./api";

interface Props {
	postId: number;
	userStatus: "owner" | "unknown";
	onClose: () => void;
	onDelete: () => void;
}

export const EventPostActionMenu: React.FC<Props> = ({
	postId,
	userStatus,
	onClose,
	onDelete,
}) => {
	const handleDelete = async (): Promise<void> => {
		try {
			await deleteEventPost(postId);
			onClose();
			onDelete();
		} catch (err) {
			console.error(err);
		}
	};

	const handleComplain = async (): Promise<void> => {
		try {
			await complainEventPost(postId);
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
			{userStatus !== "owner" && (
				<ActionSheetItem autoclose onClick={handleComplain}>
					Пожаловаться
				</ActionSheetItem>
			)}
			{userStatus === "owner" && (
				<ActionSheetItem autoclose mode="destructive" onClick={handleDelete}>
					Удалить
				</ActionSheetItem>
			)}
		</ActionSheet>
	);
};
