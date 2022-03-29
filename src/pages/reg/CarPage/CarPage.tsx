import React, { useState } from "react";
import {
	Button,
	File,
	FixedLayout,
	FormItem,
	FormLayout,
	Input,
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Textarea,
} from "@vkontakte/vkui";
import { Icon24Camera } from "@vkontakte/icons";
import styles from "./CarPage.module.css";
import { CarForm, emptyCarForm, isCarFormFilled } from "./api";

interface Props {
	id: string;
	onFormSubmit: (form: CarForm) => void;
	onBackClick: () => void;
	onNextClick: () => void;
}

export const CarPage: React.FC<Props> = ({
	id,
	onBackClick,
	onNextClick,
	onFormSubmit,
}) => {
	const [carForm, setCarForm] = useState(emptyCarForm);

	return (
		<Panel id={id}>
			<PanelHeader
				left={
					<PanelHeaderBack className={styles.backIcon} onClick={onBackClick} />
				}
			>
				Автомобиль
			</PanelHeader>
			<FormLayout
				onSubmit={(e) => {
					e.preventDefault();
					onFormSubmit(carForm);
					onNextClick();
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
				<FixedLayout vertical="bottom">
					<FormItem>
						<Button
							stretched
							size="l"
							type="submit"
							disabled={!isCarFormFilled(carForm)}
						>
							Дальше
						</Button>
					</FormItem>
				</FixedLayout>
			</FormLayout>
		</Panel>
	);
};
