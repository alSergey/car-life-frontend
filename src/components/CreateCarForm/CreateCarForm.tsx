import React, { useState } from "react";
import {
	Button,
	FormItem,
	FormLayout,
	FormLayoutGroup,
	Input,
	Textarea,
} from "@vkontakte/vkui";
import { CarForm, emptyCarForm, isCarFormFilled } from "./api";
import { UploadFile } from "../UploadFile";

interface Props {
	buttonText?: string;
	loading?: boolean;
	onSubmit: (form: CarForm) => void;
}

export const CreateCarFom: React.FC<Props> = ({
	buttonText,
	loading,
	onSubmit,
}) => {
	const [formData, setFormData] = useState(emptyCarForm);

	return (
		<FormLayout
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit(formData);
			}}
		>
			<FormItem
				top="Марка *"
				bottom={formData.brand ? "" : "Укажите марку автомобиля"}
				status={formData.brand ? "valid" : "error"}
			>
				<Input
					type="text"
					value={formData.brand}
					placeholder="Не указано"
					onChange={({ target: { value } }) => {
						setFormData((oldForm) => ({
							...oldForm,
							brand: value,
						}));
					}}
				/>
			</FormItem>
			<FormItem
				top="Модель *"
				bottom={formData.model ? "" : "Укажите модель автомобиля"}
				status={formData.model ? "valid" : "error"}
			>
				<Input
					type="text"
					value={formData.model}
					placeholder="Не указано"
					onChange={({ target: { value } }) => {
						setFormData((oldForm) => ({
							...oldForm,
							model: value,
						}));
					}}
				/>
			</FormItem>
			<FormItem top="Кузов">
				<Input
					type="text"
					value={formData.body}
					placeholder="Не указано"
					onChange={({ target: { value } }) => {
						setFormData((oldForm) => ({
							...oldForm,
							body: value,
						}));
					}}
				/>
			</FormItem>
			<FormItem top="Мотор">
				<Input
					type="text"
					value={formData.engine}
					placeholder="Не указано"
					onChange={({ target: { value } }) => {
						setFormData((oldForm) => ({
							...oldForm,
							engine: value,
						}));
					}}
				/>
			</FormItem>
			<FormLayoutGroup mode="horizontal">
				<FormItem
					top="Год выпуска *"
					bottom={
						+formData.date > 1000 && +formData.date < 2200
							? ""
							: "Укажите корректный год выпуска автомобиля"
					}
					status={
						+formData.date > 1000 && +formData.date < 2200 ? "valid" : "error"
					}
				>
					<Input
						pattern="\d{4}"
						type="number"
						value={formData.date}
						placeholder="Не указано"
						onChange={({ target: { value } }) => {
							setFormData((oldForm) => ({
								...oldForm,
								date: value,
							}));
						}}
					/>
				</FormItem>
				<FormItem top="Лошадиные силы">
					<Input
						type="number"
						value={formData.horsePower}
						placeholder="Не указано"
						onChange={({ target: { value } }) => {
							setFormData((oldForm) => ({
								...oldForm,
								horsePower: value,
							}));
						}}
					/>
				</FormItem>
			</FormLayoutGroup>
			<FormItem
				top="Кличка автомобиля"
				bottom="А ты зовешь ее(его) по-особенному?"
			>
				<Input
					type="text"
					value={formData.name}
					placeholder="Не указано"
					onChange={({ target: { value } }) => {
						setFormData((oldForm) => ({
							...oldForm,
							name: value,
						}));
					}}
				/>
			</FormItem>
			<FormItem
				top="Подробности"
				bottom="Здесь ты можешь рассказать историю своего автомобиля, описать все доработки, добавить что-то интересное"
			>
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
			<FormItem top="Фотокарточка *">
				<UploadFile
					fileList={formData.file && [formData.file]}
					onChange={(fileList) => {
						setFormData((oldForm) => ({
							...oldForm,
							file: fileList[0],
						}));
					}}
				/>
			</FormItem>
			<FormItem>
				<Button
					stretched
					size="l"
					type="submit"
					loading={loading}
					disabled={!isCarFormFilled(formData) || loading}
				>
					{buttonText || "Создать"}
				</Button>
			</FormItem>
		</FormLayout>
	);
};
