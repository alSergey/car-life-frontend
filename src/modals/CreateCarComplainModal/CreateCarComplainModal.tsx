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
import { getCreateCarComplainModalQuery } from "../../router";
import { complainCar } from "./api";

interface Props {
	id: string;
	onClose: () => void;
}

export const CreateCarComplainModal: React.FC<Props> = ({ id, onClose }) => {
	const { modalCarId } = getCreateCarComplainModalQuery();

	const [formData, setFormData] = useState(emptyComplainForm);
	const [loading, setLoading] = useState(false);

	const handleComplainCar = async (): Promise<void> => {
		setLoading(true);
		try {
			await complainCar(modalCarId, formData);
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
							onClick={handleComplainCar}
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
