import React from "react";
import { ActionSheet, ActionSheetItem } from "@vkontakte/vkui";
import { complainUser } from "./api";

interface Props {
	userId: number;
	onClose: () => void;
}

export const UserActionMenu: React.FC<Props> = ({ userId, onClose }) => {
	const handleComplain = async (): Promise<void> => {
		try {
			await complainUser(userId);
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
			<ActionSheetItem autoclose onClick={handleComplain}>
				Пожаловаться
			</ActionSheetItem>
		</ActionSheet>
	);
};
