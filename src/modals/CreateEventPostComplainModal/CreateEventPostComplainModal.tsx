import React, { useState } from "react";
import {
	ModalPage,
	ModalPageHeader,
	PanelHeaderClose,
	PanelHeaderSubmit,
} from "@vkontakte/vkui";
import {
	CreateComplainForm,
	emptyComplainForm,
	isComplainFormFilled,
} from "../../components/CreateComplainForm";
import { getCreateEventPostComplainModalQuery } from "../../router";
import { complainEventPost } from "./api";

interface Props {
	id: string;
	onClose: () => void;
}

export const CreateEventPostComplainModal: React.FC<Props> = ({
	id,
	onClose,
}) => {
	const { modalEventPostId } = getCreateEventPostComplainModalQuery();

	const [formData, setFormData] = useState(emptyComplainForm);
	const [loading, setLoading] = useState(false);

	const handleComplainEventPost = async (): Promise<void> => {
		setLoading(true);
		try {
			await complainEventPost(modalEventPostId, formData);
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
					left={<PanelHeaderClose onClick={onClose} />}
					right={
						<PanelHeaderSubmit
							disabled={!isComplainFormFilled(formData) || loading}
							onClick={handleComplainEventPost}
						/>
					}
				>
					Пожаловаться
				</ModalPageHeader>
			}
		>
			<CreateComplainForm formData={formData} setFormData={setFormData} />
		</ModalPage>
	);
};
