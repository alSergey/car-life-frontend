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
import { getCreateEventComplainModalQuery } from "../../router";
import { complainEvent } from "./api";

interface Props {
	id: string;
	onClose: () => void;
}

export const CreateEventComplainModal: React.FC<Props> = ({ id, onClose }) => {
	const { modalEventId } = getCreateEventComplainModalQuery();

	const [formData, setFormData] = useState(emptyComplainForm);
	const [loading, setLoading] = useState(false);

	const handleComplainEvent = async (): Promise<void> => {
		setLoading(true);
		try {
			await complainEvent(modalEventId, formData);
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
							onClick={handleComplainEvent}
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
