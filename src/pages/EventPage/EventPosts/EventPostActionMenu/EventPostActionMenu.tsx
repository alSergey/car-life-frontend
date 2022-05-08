import React from "react";
import { ActionSheet, ActionSheetItem } from "@vkontakte/vkui";
import {
	CREATE_EVENT_POST_COMPLAIN_MODAL,
	setCreateEventPostComplainModalQuery,
} from "../../../../router";
import { useRouter } from "@happysanta/router";
import { deleteEventPost } from "./api";

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
	const router = useRouter();

	const handleDeleteEventPost = async (): Promise<void> => {
		try {
			await deleteEventPost(postId);
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
			{userStatus !== "owner" && (
				<ActionSheetItem
					autoclose
					onClick={() =>
						router.pushModal(
							CREATE_EVENT_POST_COMPLAIN_MODAL,
							setCreateEventPostComplainModalQuery(postId)
						)
					}
				>
					Пожаловаться
				</ActionSheetItem>
			)}
			{userStatus === "owner" && (
				<ActionSheetItem
					autoclose
					mode="destructive"
					onClick={handleDeleteEventPost}
				>
					Удалить
				</ActionSheetItem>
			)}
		</ActionSheet>
	);
};
