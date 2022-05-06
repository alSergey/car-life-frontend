import React, { useState } from "react";
import { FormItem, FormLayout, Button, Input, Textarea } from "@vkontakte/vkui";
import { ClubForm, emptyClubForm, isClubFormFilled } from "./api";
import { ClubTagWidget } from "../../widgets/ClubTagWidget";
import { UploadFile } from "../UploadFile";

interface Props {
	buttonText?: string;
	loading?: boolean;
	onSubmit: (form: ClubForm) => void;
}

export const CreateClubForm: React.FC<Props> = ({
	buttonText,
	loading,
	onSubmit,
}) => {
	const [formData, setFormData] = useState(emptyClubForm);

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
			<FormItem top="Теги *">
				<ClubTagWidget
					values={formData.tags}
					onChange={(tags) => {
						setFormData((oldForm) => ({
							...oldForm,
							tags,
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
					disabled={!isClubFormFilled(formData) || loading}
				>
					{buttonText || "Создать"}
				</Button>
			</FormItem>
		</FormLayout>
	);
};
