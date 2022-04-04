import React, { useState } from "react";
import {
	FormItem,
	FormLayout,
	Button,
	Input,
	Textarea,
	File,
} from "@vkontakte/vkui";
import { Icon24Camera } from "@vkontakte/icons";
import { ClubForm, emptyClubForm, isClubFormFilled } from "./api";
import { ClubTagWidget } from "../../widgets/ClubTagWidget";

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
