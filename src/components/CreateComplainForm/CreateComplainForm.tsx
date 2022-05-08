import React, { Dispatch, SetStateAction } from "react";
import { FormItem, FormLayout, Textarea } from "@vkontakte/vkui";
import { ComplainForm } from "./api";

interface Props {
	formData: ComplainForm;
	setFormData: Dispatch<SetStateAction<ComplainForm>>;
}

export const CreateComplainForm: React.FC<Props> = ({
	formData,
	setFormData,
}) => {
	return (
		<FormLayout style={{ height: 450 }}>
			<FormItem top="Описание">
				<Textarea
					rows={1}
					placeholder="Не указано"
					value={formData.text}
					onChange={({ target: { value } }) => {
						setFormData((oldForm) => ({
							...oldForm,
							text: value,
						}));
					}}
				/>
			</FormItem>
		</FormLayout>
	);
};
