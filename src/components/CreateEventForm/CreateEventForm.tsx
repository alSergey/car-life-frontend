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
import { emptyEventForm, EventForm, isEventFormFilled } from "./api";
import { OwnerClubWidget } from "../../widgets/OwnerClubWidget";
import { CreateEventMap } from "./CreateEventMap";

interface Props {
	buttonText?: string;
	loading?: boolean;
	onSubmit: (form: EventForm) => void;
}

export const CreateEventForm: React.FC<Props> = ({
	buttonText,
	loading,
	onSubmit,
}) => {
	const [form, setFormData] = useState(emptyEventForm);

	return (
		<FormLayout
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit(form);
			}}
		>
			<FormItem top="Название">
				<Input
					type="text"
					placeholder="Не указано"
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
					placeholder="Не указано"
					value={form.description}
					onChange={({ target: { value } }) => {
						setFormData({
							...form,
							description: value,
						});
					}}
				/>
			</FormItem>
			<FormItem top="Клуб">
				<OwnerClubWidget
					selected={form.club}
					onChange={(club) => {
						setFormData({
							...form,
							club,
						});
					}}
				/>
			</FormItem>
			<FormLayoutGroup mode="horizontal">
				<FormItem top="Дата">
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
				<FormItem top="Время">
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
				<CreateEventMap
					location={form.location}
					onChange={(location) => {
						setFormData({
							...form,
							location,
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

						setFormData({
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
					loading={loading}
					disabled={!isEventFormFilled(form)}
				>
					{buttonText || "Создать"}
				</Button>
			</FormItem>
		</FormLayout>
	);
};
