import React, { useState } from "react";
import {
	Button,
	FormItem,
	FormLayout,
	FormLayoutGroup,
	Input,
	Textarea,
} from "@vkontakte/vkui";
import { emptyEventForm, EventForm, isEventFormFilled } from "./api";
import { OwnerClubWidget } from "../../widgets/OwnerClubWidget";
import { CreateEventMap } from "./CreateEventMap";
import { UploadFile } from "../UploadFile";

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
			<FormItem top="Название *">
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
			<FormItem top="Описание *">
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
			<FormItem top="Клуб *">
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
				<FormItem top="Дата *">
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
				<FormItem top="Время *">
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
			<FormItem top="Место *">
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
			<FormItem top="Аватарка *">
				<UploadFile
					fileList={form.file && [form.file]}
					onChange={(fileList) => {
						setFormData({
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
					disabled={!isEventFormFilled(form) || loading}
				>
					{buttonText || "Создать"}
				</Button>
			</FormItem>
		</FormLayout>
	);
};
