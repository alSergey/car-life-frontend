import React, { useEffect, useState } from "react";
import {
	FormItem,
	FormLayout,
	Button,
	FormStatus,
	FixedLayout,
	Input,
	Textarea,
	File,
} from "@vkontakte/vkui";
import { ChipsSelect } from "@vkontakte/vkui/unstable";
import {
	createNewClub,
	emptyClubTags,
	emptyCreateClubForm,
	getTagsList,
	isCreateClubFormFilled,
} from "./api";
import { Icon24Camera } from "@vkontakte/icons";

interface Props {
	onSubmit: (clubId: number) => void;
}

export const CreateClubWidget: React.FC<Props> = ({ onSubmit }) => {
	const [tags, setTags] = useState(emptyClubTags);
	const [form, setFormData] = useState(emptyCreateClubForm);
	const [error, setError] = useState("");

	const handleSubmit = async (): Promise<void> => {
		try {
			const id = await createNewClub(form);
			if (!id) return;

			onSubmit(id);
		} catch (err) {
			console.error(err);
			setError(err.message);
		}
	};

	const handleGetTags = async (): Promise<void> => {
		try {
			const data = await getTagsList();
			setTags(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		handleGetTags();
	}, []);

	return (
		<FormLayout
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}
		>
			{error && (
				<FormItem>
					<FormStatus header="Ошибка" mode="error">
						{error}
					</FormStatus>
				</FormItem>
			)}
			<FormItem top="Название">
				<Input
					type="text"
					placeholder="Укажите название"
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
					placeholder="Укажите описание"
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
				<ChipsSelect
					value={form.tags}
					options={tags}
					placeholder="Не выбраны"
					onChange={(value) => {
						setFormData({
							...form,
							tags: value,
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
			<FixedLayout vertical="bottom">
				<FormItem>
					<Button
						stretched
						size="l"
						type="submit"
						disabled={!isCreateClubFormFilled(form)}
					>
						Создать
					</Button>
				</FormItem>
			</FixedLayout>
		</FormLayout>
	);
};