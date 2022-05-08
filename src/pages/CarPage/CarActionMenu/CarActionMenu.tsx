import React from "react";
import { ActionSheet, ActionSheetItem } from "@vkontakte/vkui";
import {
	CREATE_CAR_COMPLAIN_MODAL,
	setCreateCarComplainModalQuery,
} from "../../../router";
import { useRouter } from "@happysanta/router";
import { deleteCar } from "./api";

interface Props {
	carId: number;
	userStatus: "owner" | "unknown";
	onClose: () => void;
	onDelete: () => void;
}

export const CarActionMenu: React.FC<Props> = ({
	carId,
	userStatus,
	onClose,
	onDelete,
}) => {
	const router = useRouter();

	const handleDeleteCar = async (): Promise<void> => {
		try {
			await deleteCar(carId);
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
							CREATE_CAR_COMPLAIN_MODAL,
							setCreateCarComplainModalQuery(carId)
						)
					}
				>
					Пожаловаться
				</ActionSheetItem>
			)}
			{userStatus === "owner" && (
				<ActionSheetItem autoclose mode="destructive" onClick={handleDeleteCar}>
					Удалить
				</ActionSheetItem>
			)}
		</ActionSheet>
	);
};
