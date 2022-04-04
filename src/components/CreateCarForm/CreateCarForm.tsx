import React, { useState } from "react";
import {
	Button,
	File,
	FormItem,
	FormLayout,
	FormLayoutGroup,
	Input,
	Textarea,
} from "@vkontakte/vkui";
import { Icon24Camera } from "@vkontakte/icons";
import { CarForm, emptyCarForm, isCarFormFilled } from "./api";

interface Props {
	buttonText?: string;
	onSubmit: (form: CarForm) => void;
}

export const CreateCarFom: React.FC<Props> = ({ buttonText, onSubmit }) => {
	const [form, setForm] = useState(emptyCarForm);

	return (
		<FormLayout
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit(form);
			}}
		>
			<FormItem top="Марка">
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
			<FormItem top="Модель">
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
				<FormItem top="Год выпуска">
					<Input
						type="date"
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
						type="text"
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
			<FormItem top="Имя">
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
			<FormItem top="Описание">
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
			<FormItem top="Аватарка">
				<File
					stretched
					name="file-upload"
					controlSize="l"
					before={<Icon24Camera />}
					mode="secondary"
					accept=".jpeg,.jpg,.png.webp"
					onChange={({ target: { files } }) => {
						if (!files) return;

						setForm({
							...form,
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
					disabled={!isCarFormFilled(form)}
				>
					{buttonText || "Создать"}
				</Button>
			</FormItem>
		</FormLayout>
	);
};
