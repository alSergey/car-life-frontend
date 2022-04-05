import React, { useState } from "react";
import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";

import { createNewCar } from "./api";
import { CarForm, CreateCarFom } from "../../components/CreateCarForm";

interface Props {
	id: string;
	onBackClick?: () => void;
	onSubmit: (carId: number) => void;
}

export const CreateCarPage: React.FC<Props> = ({
	id,
	onBackClick,
	onSubmit,
}) => {
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (form: CarForm): Promise<void> => {
		setLoading(true);
		try {
			const carId = await createNewCar(form);
			if (!carId) return;

			onSubmit(carId);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Panel id={id}>
			<PanelHeader
				left={onBackClick && <PanelHeaderBack onClick={onBackClick} />}
			>
				Новая машина
			</PanelHeader>
			<CreateCarFom loading={loading} onSubmit={handleSubmit} />
		</Panel>
	);
};
