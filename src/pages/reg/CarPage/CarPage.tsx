import React, { useState } from "react";
import {
	Button,
	File,
	FormItem,
	FormLayout,
	FormLayoutGroup,
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
			<FormLayout>
				<FormItem top="Марка">
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
				<FormItem top="Кузов">
					<Input
						type="text"
						value={carForm.body}
						placeholder="Не указано"
						onChange={({ target: { value } }) => {
							setCarForm({
								...carForm,
								body: value,
							});
						}}
					/>
				</FormItem>
				<FormItem top="Мотор">
					<Input
						type="text"
						value={carForm.engine}
						placeholder="Не указано"
						onChange={({ target: { value } }) => {
							setCarForm({
								...carForm,
								engine: value,
							});
						}}
					/>
				</FormItem>
				<FormLayoutGroup mode="horizontal">
					<FormItem top="Год выпуска">
						<Input
							type="text"
							value={carForm.horsePower}
							placeholder="Не указано"
							onChange={({ target: { value } }) => {
								setCarForm({
									...carForm,
									horsePower: value,
								});
							}}
						/>
					</FormItem>
					<FormItem top="Лошадиные силы">
						<Input
							type="text"
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
				</FormLayoutGroup>
				<FormItem top="Имя">
					<Input
						type="text"
						value={carForm.name}
						placeholder="Не указано"
						onChange={({ target: { value } }) => {
							setCarForm({
								...carForm,
								name: value,
							});
						}}
					/>
				</FormItem>
				<FormItem top="Описание">
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
				<FormLayoutGroup mode="horizontal">
					<FormItem>
						<Button
							stretched
							size="l"
							mode="secondary"
							onClick={() => onNextClick()}
						>
							Пропустить
						</Button>
					</FormItem>
					<FormItem>
						<Button
							stretched
							size="l"
							type="submit"
							disabled={!isCarFormFilled(carForm)}
							onClick={() => {
								onFormSubmit(carForm);
								onNextClick();
							}}
						>
							Дальше
						</Button>
					</FormItem>
				</FormLayoutGroup>
			</FormLayout>
		</Panel>
	);
};
