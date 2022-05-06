import React, { ReactNode, useEffect, useState } from "react";
import { FormItem, FormLayout, Button, Textarea } from "@vkontakte/vkui";
import styles from "./CreateUserAboutForm.module.css";
import {
	emptyUserAboutForm,
	isUserAboutFormFilled,
	UserAboutForm,
} from "./api";
import { ClubTagWidget } from "../../widgets/ClubTagWidget";

interface Props {
	userAbout?: UserAboutForm;
	onSubmit: (form: UserAboutForm) => void;
	buttonSlot?: ReactNode;
	buttonText?: string;
}

const describeTest =
	"Поделитеcь своими мыслями или расскажите кто вы, а может, вы хотите, " +
	"чтобы первое, о чем узнают другие пользователи, была какая-то невероятная история " +
	"или фраза жизни. Оставьте любую информацию, которую другие пользователи увидят, " +
	"перейдя на вашу страничку";

export const CreateUserAboutForm: React.FC<Props> = ({
	userAbout,
	onSubmit,
	buttonSlot,
	buttonText,
}) => {
	const [formData, setFormData] = useState(emptyUserAboutForm);

	useEffect(() => {
		if (userAbout) setFormData(userAbout);
	}, []);

	return (
		<FormLayout
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit(formData);
			}}
		>
			<FormItem top="Выберите интересы">
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
			<FormItem top="Напишите о себе" bottom={describeTest}>
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
			<FormItem className={styles.buttons}>
				{buttonSlot}
				<Button
					stretched
					size="l"
					type="submit"
					disabled={!isUserAboutFormFilled(formData)}
				>
					{buttonText || "Создать"}
				</Button>
			</FormItem>
		</FormLayout>
	);
};
