import React from "react";
import { ActionSheet, ActionSheetItem } from "@vkontakte/vkui";
import { complainCar, deleteCar } from "./api";

interface Props {
	carId: number;
	userStatus: "owner" | "unknown";
	onClose: () => void;
}

export const CarActionMenu: React.FC<Props> = ({
	carId,
	userStatus,
	onClose,
}) => {
	const handleDelete = async (): Promise<void> => {
		try {
			await deleteCar(carId);
			onClose();
		} catch (err) {
			console.error(err);
		}
	};

	const handleComplain = async (): Promise<void> => {
		try {
			await complainCar(carId);
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
