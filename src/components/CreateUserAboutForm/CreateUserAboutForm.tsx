import React, { useState } from "react";
import { FormItem, FormLayout, Button, Textarea } from "@vkontakte/vkui";
import {
	emptyUserAboutForm,
	isUserAboutFormFilled,
	UserAboutForm,
} from "./api";
import { ClubTagWidget } from "../../widgets/ClubTagWidget";

interface Props {
	buttonText?: string;
	onSubmit: (form: UserAboutForm) => void;
}

const describeTest =
	"Поделитеь своими мыслями или расскажите кто вы, а может вы хотите, " +
	"чтобы первое о чем узнают другие пользователи была какая-то невероятная история " +
	"или фраза жизни. Оставьте любую информацию, которую другие пользователи увидят, " +
	"перейдя на вашу страничку";

export const CreateUserAboutForm: React.FC<Props> = ({
	buttonText,
	onSubmit,
}) => {
	const [form, setFormData] = useState(emptyUserAboutForm);

	return (
		<FormLayout
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit(form);
			}}
		>
			<FormItem top="Выберите интересы">
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
			<FormItem top="Напишите о себе" bottom={describeTest}>
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
			<FormItem>
				<Button
					stretched
					size="l"
					type="submit"
					disabled={!isUserAboutFormFilled(form)}
				>
					{buttonText || "Создать"}
				</Button>
			</FormItem>
		</FormLayout>
	);
};
