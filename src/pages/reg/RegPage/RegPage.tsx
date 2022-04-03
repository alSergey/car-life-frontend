import React from "react";
import {
	Button,
	Div,
	Panel,
	PanelHeader,
	PanelHeaderBack,
} from "@vkontakte/vkui";
import styles from "./RegPage.module.css";

interface Props {
	id: string;
	onBackClick: () => void;
	onNextClick: () => void;
}

export const RegPage: React.FC<Props> = ({ id, onBackClick, onNextClick }) => {
	return (
		<Panel id={id} centered>
			<PanelHeader left={<PanelHeaderBack onClick={onBackClick} />}>
				Регистрация
			</PanelHeader>
			<Div className={styles.container}>
				<span>Жми вход и пристегни ремни, мы стартуем!</span>
				<Button
					style={{ backgroundColor: "rgba(61,161,58,0.79)" }}
					size="l"
					onClick={onNextClick}
				>
					Поехали!
				</Button>
			</Div>
		</Panel>
	);
};
