import React, { useEffect, useState } from "react";
import {
	Button,
	CustomSelect,
	FormItem,
	FormLayout,
	Input,
	Textarea,
} from "@vkontakte/vkui";
import styles from "./CreateMiniEventForm.module.css";
import { EventsTypes } from "./CreateMiniEventForm.config";
import {
	createNewMiniEvent,
	emptyMiniEventForm,
	isMiniEventFormFilled,
} from "./api";
import { Icon24CancelOutline, Icon28AddOutline } from "@vkontakte/icons";

interface Location {
	latitude: number;
	longitude: number;
}

interface Props {
	location: Location | null;
	onCreate: () => void;
}

export const CreateMiniEventForm: React.FC<Props> = ({
	location,
	onCreate,
}) => {
	const [isOpened, setIsOpened] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState(emptyMiniEventForm);

	const handleCreateMiniEvent = async () => {
		setLoading(true);
		try {
			await createNewMiniEvent(formData);
			setIsOpened(false);
			onCreate();

			setFormData(emptyMiniEventForm);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!location) return;

		setFormData((oldForm) => ({
			...oldForm,
			...location,
		}));
	}, [location]);

	return (
		<div>
			{isOpened && (
				<div className={styles.form}>
					<FormLayout>
						<FormItem top="Тип события">
							<CustomSelect
								placeholder="Не выбран"
								options={EventsTypes}
								value={formData.type_id}
								onChange={({ target: { value } }) => {
									setFormData((oldForm) => ({
										...oldForm,
										type_id: Number(value),
									}));
								}}
							/>
						</FormItem>
						<FormItem top="Краткое описание">
							<Textarea
								rows={1}
								placeholder="Не указано"
								value={formData.description}
								onChange={({ target: { value } }) => {
									setFormData((oldForm) => ({
										...oldForm,
										description: value,
									}));
								}}
							/>
						</FormItem>
						<FormItem top="До скольки актуальна точка">
							<Input
								type="time"
								value={formData.ended_at}
								onChange={({ target: { value } }) => {
									setFormData((oldForm) => ({
										...oldForm,
										ended_at: value,
									}));
								}}
							/>
						</FormItem>
						<FormItem>
							<Button
								type="submit"
								loading={loading}
								disabled={!isMiniEventFormFilled(formData) || loading}
								onClick={handleCreateMiniEvent}
							>
								Создать
							</Button>
						</FormItem>
					</FormLayout>
				</div>
			)}
			{location && (
				<Button
					className={styles.addButton}
					size="l"
					mode="secondary"
					style={{
						width: 55,
						height: 55,
						backgroundColor: isOpened ? "#cb2626" : "#efefef",
					}}
					onClick={() => setIsOpened(!isOpened)}
					before={
						isOpened ? (
							<Icon24CancelOutline width={35} height={35} fill="#ffffff" />
						) : (
							<Icon28AddOutline width={35} height={35} />
						)
					}
				/>
			)}
		</div>
	);
};
