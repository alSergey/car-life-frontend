import React, { useContext, useState } from "react";
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
import { UserContext } from "../../../context/userContext";
import { UploadFile } from "../../../components/UploadFile";

interface Props {
	onClose: () => void;
	id: string;
}

export interface EventPostData {
	userId: number;
	text: string;
	files: File[] | null;
}

export const CreateEventPost: React.FC<Props> = ({ onClose, id }) => {
	const { userState } = useContext(UserContext);
	const [showError, setShowError] = useState("");
	const [form, setForm] = useState<EventPostData>({
		userId: userState.id,
		text: "",
		files: null,
	});
	const { updateModalHeight } = useContext(ModalRootContext);

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
							updateModalHeight();
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
							updateModalHeight();
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
