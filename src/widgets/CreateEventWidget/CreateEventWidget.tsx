import React, { useState } from "react";
import {
	FormItem,
	Input,
	Textarea,
	FormLayout,
	Button,
	FormLayoutGroup,
	FormStatus,
	FixedLayout,
	File,
} from "@vkontakte/vkui";
import { Icon24Camera } from "@vkontakte/icons";
import {
	emptyCreateEventForm,
	createNewEvent,
	isCreateEventFormFilled,
} from "./api";

interface Props {
	onSubmit: (eventId: number) => void;
}

export const CreateEventWidget: React.FC<Props> = ({ onSubmit }) => {
	const [form, setFormData] = useState(emptyCreateEventForm);
	const [error, setError] = useState("");

	const handleSubmit = async (): Promise<void> => {
		try {
			const id = await createNewEvent(form);
			if (!id) return;

			onSubmit(id);
		} catch (err) {
			console.error(err);
			setError(err.message);
		}
	};

	return (
		<FormLayout
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}
		>
			{error && (
				<FormItem>
					<FormStatus header="Ошибка" mode="error">
						{error}
					</FormStatus>
				</FormItem>
			)}
			<FormItem top="Название">
				<Input
					type="text"
					placeholder="Укажите название"
					value={form.name}
					onChange={({ target: { value } }) => {
						setFormData({
							...form,
							name: value,
						});
					}}
				/>
			</FormItem>
			<FormItem top="Описание">
				<Textarea
					rows={1}
					placeholder="Укажите описание"
					value={form.description}
					onChange={({ target: { value } }) => {
						setFormData({
							...form,
							description: value,
						});
					}}
				/>
			</FormItem>
			<FormLayoutGroup mode="horizontal">
				<FormItem top="Время">
					<Input
						type="date"
						value={form.date}
						onChange={({ target: { value } }) => {
							setFormData({
								...form,
								date: value,
							});
						}}
					/>
				</FormItem>
				<FormItem top="Дата">
					<Input
						type="time"
						value={form.time}
						onChange={({ target: { value } }) => {
							setFormData({
								...form,
								time: value,
							});
						}}
					/>
				</FormItem>
			</FormLayoutGroup>
			<FormItem top="Место">
				<Input type="text" value={form.location.description} disabled />
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

						setFormData({
							...form,
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
						disabled={!isCreateEventFormFilled(form)}
					>
						Создать
					</Button>
				</FormItem>
			</FixedLayout>
		</FormLayout>
	);
};
