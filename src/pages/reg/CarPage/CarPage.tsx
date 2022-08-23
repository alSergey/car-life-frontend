import React from "react";
import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";

import { CarForm, CreateCarFom } from "../../../components/CreateCarForm";

interface Props {
	id: string;
	onBackClick: () => void;
	onNextClick: () => void;
	onFormSubmit: (form: CarForm) => void;
}

export const CarPage: React.FC<Props> = ({
	id,
	onBackClick,
	onNextClick,
	onFormSubmit,
}) => {
	return (
		<Panel id={id}>
			<PanelHeader before={<PanelHeaderBack onClick={onBackClick} />}>
				Автомобиль
			</PanelHeader>
			<CreateCarFom
				buttonText="Дальше"
				onSubmit={(carForm) => {
					onFormSubmit(carForm);
					onNextClick();
				}}
			/>
		</Panel>
	);
};
