import React, { Dispatch, SetStateAction, useState } from "react";
import { FormItem, FormLayout, Textarea, FormStatus } from "@vkontakte/vkui";
import { UploadFile } from "../UploadFile";
import { EventPostForm } from "./api";

interface Props {
	formData: EventPostForm;
	setFormData: Dispatch<SetStateAction<EventPostForm>>;
	onSubmit: (form: EventPostForm) => void;
}

export const CreateEventPostForm: React.FC<Props> = ({
	formData,
	setFormData,
	onSubmit,
}) => {
	const [errorText, setErrorText] = useState("");

	return (
		<FormLayout
			style={{ height: 650 }}
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit(formData);
			}}
		>
			{Boolean(errorText) && (
				<FormItem>
					<FormStatus mode="error">{errorText}</FormStatus>
				</FormItem>
			)}
			<FormItem top="Описание">
				<Textarea
					rows={1}
					placeholder="Здесь было очень круто"
					value={formData.text}
					onChange={({ target: { value } }) => {
						setErrorText("");

						setFormData((oldForm) => ({
							...oldForm,
							text: value,
						}));
					}}
				/>
			</FormItem>
			<FormItem
				top="Фотокарточки с места события"
				bottom="Можно загрузить не больше 10 фото"
			>
				<UploadFile
					fileList={formData.files}
					multiple
					onChange={(fileList) => {
						setErrorText("");

						if (!fileList) return;
						if (fileList.length > 10) {
							setErrorText("Нельзя загружать больше 10 файлов");
							return;
						}

						setFormData((oldForm) => ({
							...oldForm,
							files: fileList,
						}));
					}}
				/>
			</FormItem>
		</FormLayout>
	);
};
