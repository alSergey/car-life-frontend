import React from "react";
import { ActionSheet, ActionSheetItem } from "@vkontakte/vkui";
import {
	CREATE_USER_COMPLAIN_MODAL,
	setCreateUserComplainModalQuery,
} from "../../../router";
import { useRouter } from "@happysanta/router";

interface Props {
	userId: number;
	onClose: () => void;
}

export const UserActionMenu: React.FC<Props> = ({ userId, onClose }) => {
	const router = useRouter();

	return (
		<ActionSheet
			onClose={onClose}
			iosCloseItem={
				<ActionSheetItem autoclose mode="cancel">
					Отменить
				</ActionSheetItem>
			}
		>
			<ActionSheetItem
				autoclose
				onClick={() => {
					router.pushModal(
						CREATE_USER_COMPLAIN_MODAL,
						setCreateUserComplainModalQuery(userId)
					);
				}}
			>
				Пожаловаться
			</ActionSheetItem>
		</ActionSheet>
	);
};
