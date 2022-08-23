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
import { getCreateUserComplainModalQuery } from "../../router";
import { complainUser } from "./api";

interface Props {
	id: string;
	onClose: () => void;
}

export const CreateUserComplainModal: React.FC<Props> = ({ id, onClose }) => {
	const { modalUserId } = getCreateUserComplainModalQuery();

	const [formData, setFormData] = useState(emptyComplainForm);
	const [loading, setLoading] = useState(false);

	const handleComplainUser = async (): Promise<void> => {
		setLoading(true);
		try {
			await complainUser(modalUserId, formData);
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
							disabled={!isComplainFormFilled(formData) || loading}
							onClick={handleComplainUser}
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
