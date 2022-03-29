import React, { useState } from "react";
import {
	Button,
	File,
	FormItem,
	FormLayout,
	Input,
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Textarea,
} from "@vkontakte/vkui";
import styles from "./CarPage.module.css";
import { RegForm } from "../../../tabs/RegView/api";
import { emptyCarForm, isCarFormFilled } from "./api";
import { Icon24Camera } from "@vkontakte/icons";

interface Props {
	id: string;
	form: RegForm;
	onFormChange: (form: RegForm) => void;
	onBackClick: () => void;
}

export const CarPage: React.FC<Props> = ({
	id,
	form,
	onFormChange,
	onBackClick,
}) => {
	const [carForm, setCarForm] = useState(emptyCarForm);

	return (
		<Panel id={id}>
			<PanelHeader
				left={
					<PanelHeaderBack className={styles.backIcon} onClick={onBackClick} />
				}
			>
				Добавление автомобиля
			</PanelHeader>
			<FormLayout
				onSubmit={(e) => {
					e.preventDefault();
					onFormChange({
						...form,
						car: carForm,
					});
					onBackClick();
				}}
			>
				<FormItem top="Бренд">
					<Input
						type="text"
						value={carForm.brand}
						placeholder="Не указано"
						onChange={({ target: { value } }) => {
							setCarForm({
								...carForm,
								brand: value,
							});
						}}
					/>
				</FormItem>
				<FormItem top="Модель">
					<Input
						type="text"
						value={carForm.model}
						placeholder="Не указано"
						onChange={({ target: { value } }) => {
							setCarForm({
								...carForm,
								model: value,
							});
						}}
					/>
				</FormItem>
				<FormItem top="Дата изготовления">
					<Input
						type="date"
						value={carForm.date}
						placeholder="Не указано"
						onChange={({ target: { value } }) => {
							setCarForm({
								...carForm,
								date: value,
							});
						}}
					/>
				</FormItem>
				<FormItem top="Введите описание">
					<Textarea
						rows={1}
						placeholder="Не указано"
						value={carForm.description}
						onChange={({ target: { value } }) => {
							setCarForm({
								...carForm,
								description: value,
							});
						}}
					/>
				</FormItem>
				<FormItem top="Аватарка">
					<File
						stretched
						name="file-upload"
						controlSize="l"
						before={<Icon24Camera />}
						accept=".jpeg,.jpg,.png.webp"
						onChange={({ target: { files } }) => {
							if (!files) return;

							setCarForm({
								...carForm,
								file: files[0],
							});
						}}
					>
						Открыть галерею
					</File>
				</FormItem>
				<FormItem>
					<Button
						stretched
						size="l"
						type="submit"
						disabled={!isCarFormFilled(carForm)}
					>
						Добавить
					</Button>
				</FormItem>
			</FormLayout>
		</Panel>
	);
};
