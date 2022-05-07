import React from "react";
import { ActionSheet, ActionSheetItem } from "@vkontakte/vkui";
import { deleteCar } from "./api";

interface Props {
	carId: number;
	onClose: () => void;
}

export const CarActionMenu: React.FC<Props> = ({ carId, onClose }) => {
	const handleDelete = async (): Promise<void> => {
		try {
			await deleteCar(carId);
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
			<ActionSheetItem autoclose mode="destructive" onClick={handleDelete}>
				Удалить
			</ActionSheetItem>
		</ActionSheet>
	);
};
