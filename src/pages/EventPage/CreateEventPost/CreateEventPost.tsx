import React, { useContext, useState } from "react";
import {
	File,
	FormItem,
	Group,
	ModalPage,
	ModalPageHeader,
	ModalRoot,
	PanelHeaderClose,
	PanelHeaderSubmit,
	Textarea,
	Text,
} from "@vkontakte/vkui";
import { Icon24Camera } from "@vkontakte/icons";
import { createNewEventPost } from "./api";
import { UserContext } from "../../../context/userContext";

interface Props {
	onClose: () => void;
	id: string;
}

export interface EventPostData {
	userId: number;
	text: string;
	files: FileList | null;
}

export const CreateEventPost: React.FC<Props> = ({ onClose, id }) => {
	const { userState } = useContext(UserContext);
	const [showError, setShowError] = useState("");
	const [form, setForm] = useState<EventPostData>({
		userId: userState.id,
		text: "",
		files: null,
	});

	const creatNewPost = async (): Promise<void> => {
		try {
			const eventId = await createNewEventPost(form);
			if (!eventId) return;
			onClose();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<ModalPage
			style={{ zIndex: 300 }}
			id={id}
			onClose={onClose}
			header={
				<ModalPageHeader
					left={<PanelHeaderClose onClick={onClose} />}
					right={<PanelHeaderSubmit onClick={creatNewPost} />}
				>
					Новый пост
				</ModalPageHeader>
			}
		>
			<Group style={{ paddingBottom: 70 }}>
				<FormItem top="Описание">
					<Textarea
						rows={1}
						placeholder="Здесь было очент круто"
						value={form.text}
						onChange={({ target: { value } }) => {
							setShowError("");
							setForm({
								...form,
								text: value,
							});
						}}
					/>
				</FormItem>

				<FormItem
					top="Фотокарточки с места события"
					bottom="Можно загрузить не больше 10 фото"
				>
					<File
						multiple
						stretched
						name="file-upload"
						controlSize="l"
						before={<Icon24Camera />}
						mode="secondary"
						accept=".jpeg,.jpg,.png.webp"
						onChange={({ target: { files } }) => {
							setShowError("");
							if (!files) return;
							if (files.length > 10)
								setShowError("Нельзя загружать больше 10 файлов");

							setForm({
								...form,
								files: files,
							});
						}}
					>
						Открыть галерею
					</File>
				</FormItem>
				{!!showError && (
					<Text style={{ marginLeft: 12, color: "#e82c2c" }} weight="regular">
						{showError}
					</Text>
				)}
			</Group>
		</ModalPage>
	);
};
