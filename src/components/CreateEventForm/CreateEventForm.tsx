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
	const [formData, setFormData] = useState(emptyEventForm);

	return (
		<FormLayout
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit(formData);
			}}
		>
			<FormItem top="Название *">
				<Input
					type="text"
					placeholder="Не указано"
					value={formData.name}
					onChange={({ target: { value } }) => {
						setFormData((oldForm) => ({
							...oldForm,
							name: value,
						}));
					}}
				/>
			</FormItem>
			<FormItem top="Описание *">
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
			<FormItem top="Клуб *">
				<OwnerClubWidget
					selected={formData.club}
					onChange={(club) => {
						setFormData((oldForm) => ({
							...oldForm,
							club,
						}));
					}}
				/>
			</FormItem>
			<FormLayoutGroup mode="horizontal">
				<FormItem top="Дата *">
					<Input
						type="date"
						value={formData.date}
						onChange={({ target: { value } }) => {
							setFormData((oldForm) => ({
								...oldForm,
								date: value,
							}));
						}}
					/>
				</FormItem>
				<FormItem top="Время *">
					<Input
						type="time"
						value={formData.time}
						onChange={({ target: { value } }) => {
							setFormData((oldForm) => ({
								...oldForm,
								time: value,
							}));
						}}
					/>
				</FormItem>
			</FormLayoutGroup>
			<FormItem top="Место *">
				<CreateEventMap
					location={formData.location}
					onChange={(location) => {
						setFormData((oldForm) => ({
							...oldForm,
							location,
						}));
					}}
				/>
			</FormItem>
			<FormItem top="Аватарка *">
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
					disabled={!isEventFormFilled(formData) || loading}
				>
					{buttonText || "Создать"}
				</Button>
			</FormItem>
		</FormLayout>
	);
};
