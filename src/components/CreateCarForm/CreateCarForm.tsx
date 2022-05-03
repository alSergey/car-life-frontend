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
	const [form, setForm] = useState(emptyCarForm);

	return (
		<FormLayout
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit(form);
			}}
		>
			<FormItem
				top="Марка *"
				bottom={form.brand ? "" : "Укажите марку автомобиля"}
				status={form.brand ? "valid" : "error"}
			>
				<Input
					type="text"
					value={form.brand}
					placeholder="Не указано"
					onChange={({ target: { value } }) => {
						setForm({
							...form,
							brand: value,
						});
					}}
				/>
			</FormItem>
			<FormItem
				top="Модель *"
				bottom={form.model ? "" : "Укажите модель автомобиля"}
				status={form.model ? "valid" : "error"}
			>
				<Input
					type="text"
					value={form.model}
					placeholder="Не указано"
					onChange={({ target: { value } }) => {
						setForm({
							...form,
							model: value,
						});
					}}
				/>
			</FormItem>
			<FormItem top="Кузов">
				<Input
					type="text"
					value={form.body}
					placeholder="Не указано"
					onChange={({ target: { value } }) => {
						setForm({
							...form,
							body: value,
						});
					}}
				/>
			</FormItem>
			<FormItem top="Мотор">
				<Input
					type="text"
					value={form.engine}
					placeholder="Не указано"
					onChange={({ target: { value } }) => {
						setForm({
							...form,
							engine: value,
						});
					}}
				/>
			</FormItem>
			<FormLayoutGroup mode="horizontal">
				<FormItem
					top="Год выпуска *"
					bottom={
						+form.date > 1000 && +form.date < 2200
							? ""
							: "Укажите корректный год выпуска автомобиля"
					}
					status={+form.date > 1000 && +form.date < 2200 ? "valid" : "error"}
				>
					<Input
						pattern="\d{4}"
						type="number"
						value={form.date}
						placeholder="Не указано"
						onChange={({ target: { value } }) => {
							setForm({
								...form,
								date: value,
							});
						}}
					/>
				</FormItem>
				<FormItem top="Лошадиные силы">
					<Input
						type="number"
						value={form.horsePower}
						placeholder="Не указано"
						onChange={({ target: { value } }) => {
							setForm({
								...form,
								horsePower: value,
							});
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
					value={form.name}
					placeholder="Не указано"
					onChange={({ target: { value } }) => {
						setForm({
							...form,
							name: value,
						});
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
					value={form.description}
					onChange={({ target: { value } }) => {
						setForm({
							...form,
							description: value,
						});
					}}
				/>
			</FormItem>
			<FormItem top="Фотокарточка *">
				<UploadFile
					fileList={form.file && [form.file]}
					onChange={(fileList) => {
						setForm({
							...form,
							file: fileList[0],
						});
					}}
				/>
			</FormItem>
			<FormItem>
				<Button
					stretched
					size="l"
					type="submit"
					loading={loading}
					disabled={!isCarFormFilled(form) || loading}
				>
					{buttonText || "Создать"}
				</Button>
			</FormItem>
		</FormLayout>
	);
};
