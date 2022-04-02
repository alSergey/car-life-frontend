import React from "react";
import {
	Div,
	Button,
	Panel,
	PanelHeader,
	PanelHeaderBack,
} from "@vkontakte/vkui";

import styles from "./CarPage.module.css";
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
			<PanelHeader
				left={
					<PanelHeaderBack className={styles.backIcon} onClick={onBackClick} />
				}
			>
				Автомобиль
			</PanelHeader>
			<CreateCarFom
				buttonText="Дальше"
				onSubmit={(carForm) => {
					onFormSubmit(carForm);
					onNextClick();
				}}
			/>
			<Div>
				<Button
					stretched
					size="l"
					mode="secondary"
					disabled
					onClick={() => onNextClick()}
				>
					Пропустить
				</Button>
			</Div>
		</Panel>
	);
};
