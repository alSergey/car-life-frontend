import React, { useState } from "react";
import {
	File,
	FormItem,
	ModalPage,
	ModalPageHeader,
	PanelHeaderClose,
	PanelHeaderSubmit,
	Textarea,
	FormLayout,
	FormStatus,
} from "@vkontakte/vkui";
import { createNewEventPost } from "./api";
import { UploadFile } from "../../../components/UploadFile";

interface Props {
	onClose: () => void;
	onCreate: () => void;
	id: string;
	eventId: number;
}

export interface EventPostData {
	text: string;
	files: File[] | null;
}

export const CreateEventPost: React.FC<Props> = ({
	onClose,
	onCreate,
	id,
	eventId,
}) => {
	const [loading, setLoading] = useState(false);
	const [showError, setShowError] = useState("");
	const [form, setForm] = useState<EventPostData>({
		text: "",
		files: null,
	});

	const creatNewPost = async (): Promise<void> => {
		setLoading(true);
		try {
			await createNewEventPost(form, eventId);
			onCreate();
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<ModalPage
			id={id}
			onClose={onClose}
			header={
				<ModalPageHeader
					left={<PanelHeaderClose onClick={onClose} />}
					right={
						<PanelHeaderSubmit disabled={loading} onClick={creatNewPost} />
					}
				>
					Новый пост
				</ModalPageHeader>
			}
		>
			<FormLayout style={{ height: 650 }}>
				{Boolean(showError) && (
					<FormItem>
						<FormStatus mode="error">{showError}</FormStatus>
					</FormItem>
				)}
				<FormItem top="Описание">
					<Textarea
						rows={1}
						placeholder="Здесь было очень круто"
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
							if (fileList.length > 10) {
								setShowError("Нельзя загружать больше 10 файлов");
								return;
							}

							setForm({
								...form,
								files: fileList,
							});
						}}
					/>
				</FormItem>
			</FormLayout>
		</ModalPage>
	);
};
