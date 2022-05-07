import React from "react";
import { ActionSheet, ActionSheetItem } from "@vkontakte/vkui";
import { complainClub, deleteClub } from "./api";

interface Props {
	clubId: number;
	userStatus: string;
	onClose: () => void;
	onDelete: () => void;
}

export const ClubActionMenu: React.FC<Props> = ({
	clubId,
	userStatus,
	onClose,
	onDelete,
}) => {
	const handleDelete = async (): Promise<void> => {
		try {
			await deleteClub(clubId);
			onClose();
			onDelete();
		} catch (err) {
			console.error(err);
		}
	};

	const handleComplain = async (): Promise<void> => {
		try {
			await complainClub(clubId);
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
