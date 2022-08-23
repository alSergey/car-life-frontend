import React, { useState } from "react";
import {
	ModalPage,
	ModalPageHeader,
	PanelHeaderClose,
	PanelHeaderSubmit,
} from "@vkontakte/vkui";
import {
	emptyPostForm,
	CreateEventPostForm,
	isEventPostFormFilled,
} from "../../components/CreateEventPostForm";
import { getCreateEventPostModalQuery } from "../../router";
import { createNewEventPost } from "./api";

interface Props {
	id: string;
	onClose: () => void;
}

export const CreateEventPostModal: React.FC<Props> = ({ id, onClose }) => {
	const { modalEventId } = getCreateEventPostModalQuery();

	const [formData, setFormData] = useState(emptyPostForm);
	const [loading, setLoading] = useState(false);

	const handleCreateEventPost = async (): Promise<void> => {
		setLoading(true);
		try {
			await createNewEventPost(formData, modalEventId);
			onClose();
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
					before={<PanelHeaderClose onClick={onClose} />}
					after={
						<PanelHeaderSubmit
							disabled={!isEventPostFormFilled(formData) || loading}
							onClick={handleCreateEventPost}
						/>
					}
				>
					Новый пост
				</ModalPageHeader>
			}
		>
			<CreateEventPostForm formData={formData} setFormData={setFormData} />
		</ModalPage>
	);
};
