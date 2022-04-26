import React, { useContext, useEffect, useState } from "react";
import {
	ModalRootContext,
	File,
	FormItem,
	Group,
	ModalPage,
	ModalPageHeader,
	PanelHeaderClose,
	PanelHeaderSubmit,
	Textarea,
	Text,
} from "@vkontakte/vkui";
import { createNewEventPost } from "./api";
import { UploadFile } from "../../../components/UploadFile";

interface Props {
	onClose: () => void;
	updateData: () => void;
	id: string;
	eventId: number;
}

export interface EventPostData {
	text: string;
	files: File[] | null;
}

export const CreateEventPost: React.FC<Props> = ({
	onClose,
	id,
	eventId,
	updateData,
}) => {
	const [showError, setShowError] = useState("");
	const [form, setForm] = useState<EventPostData>({
		text: "",
		files: null,
	});
	const { updateModalHeight } = useContext(ModalRootContext);

	useEffect(() => {
		updateModalHeight();
	}, [form]);

	const creatNewPost = async (): Promise<void> => {
		try {
			const postId = await createNewEventPost(form, eventId);
			if (!postId) return;
			onClose();
			updateData();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<ModalPage
			id={id}
			dynamicContentHeight
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
			<Group style={{ height: 650 }}>
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
					<UploadFile
						fileList={form.files}
						multiple
						onChange={(fileList) => {
							setShowError("");
							if (!fileList) return;
							if (fileList.length > 10)
								setShowError("Нельзя загружать больше 10 файлов");
							setForm({
								...form,
								files: fileList,
							});
						}}
					/>
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
