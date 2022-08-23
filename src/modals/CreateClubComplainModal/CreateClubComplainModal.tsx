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
import { getCreateClubComplainModalQuery } from "../../router";
import { complainClub } from "./api";

interface Props {
	id: string;
	onClose: () => void;
}

export const CreateClubComplainModal: React.FC<Props> = ({ id, onClose }) => {
	const { modalClubId } = getCreateClubComplainModalQuery();

	const [formData, setFormData] = useState(emptyComplainForm);
	const [loading, setLoading] = useState(false);

	const handleComplainClub = async (): Promise<void> => {
		setLoading(true);
		try {
			await complainClub(modalClubId, formData);
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
							onClick={handleComplainClub}
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
