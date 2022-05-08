import React from "react";
import { ActionSheet, ActionSheetItem } from "@vkontakte/vkui";
import {
	CREATE_CLUB_COMPLAIN_MODAL,
	setCreateClubComplainModalQuery,
} from "../../../router";
import { useRouter } from "@happysanta/router";
import { deleteClub } from "./api";

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
	const router = useRouter();

	const handleDeleteClub = async (): Promise<void> => {
		try {
			await deleteClub(clubId);
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
					onClick={() =>
						router.pushModal(
							CREATE_CLUB_COMPLAIN_MODAL,
							setCreateClubComplainModalQuery(clubId)
						)
					}
				>
					Пожаловаться
				</ActionSheetItem>
			)}
			{userStatus === "admin" && (
				<ActionSheetItem
					autoclose
					mode="destructive"
					onClick={handleDeleteClub}
				>
					Удалить
				</ActionSheetItem>
			)}
		</ActionSheet>
	);
};
