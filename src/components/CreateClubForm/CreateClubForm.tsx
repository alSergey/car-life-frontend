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
	const [form, setFormData] = useState(emptyClubForm);

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
			<FormItem top="Теги">
				<ClubTagWidget
					values={form.tags}
					onChange={(tags) => {
						setFormData({
							...form,
							tags,
						});
					}}
				/>
			</FormItem>
			<FormItem top="Аватарка">
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
					disabled={!isClubFormFilled(form)}
				>
					{buttonText || "Создать"}
				</Button>
			</FormItem>
		</FormLayout>
	);
};
