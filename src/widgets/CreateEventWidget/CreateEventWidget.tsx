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
} from "@vkontakte/vkui";
import { emptyEventForm, isEventFormFilled, sendEvent } from "./action";

interface Props {
	onSubmit: () => void;
}

export const CreateEventWidget: React.FC<Props> = ({ onSubmit }) => {
	const [form, setFormData] = useState(emptyEventForm);
	const [error, setError] = useState("");

	const handleSubmit = async (): Promise<void> => {
		try {
			await sendEvent(form);
			onSubmit();
		} catch (err) {
			console.error(err);
			setError(err.message);
		}
	};

	return (
		<FormLayout>
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
			<FixedLayout vertical="bottom">
				<FormItem>
					<Button
						stretched
						size="l"
						type="submit"
						disabled={!isEventFormFilled(form)}
						onClick={handleSubmit}
					>
						Создать
					</Button>
				</FormItem>
			</FixedLayout>
		</FormLayout>
	);
};
