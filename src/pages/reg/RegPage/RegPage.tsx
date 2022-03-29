import React from "react";
import { Button, Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";
import styles from "./RegPage.module.css";

interface Props {
	id: string;
	onBackClick: () => void;
	onNextClick: () => void;
}

export const RegPage: React.FC<Props> = ({ id, onBackClick, onNextClick }) => {
	return (
		<Panel id={id} centered>
			<PanelHeader
				left={
					<PanelHeaderBack className={styles.backIcon} onClick={onBackClick} />
				}
			>
				Регистрация
			</PanelHeader>
			<div className={styles.container}>
				<span>В путь</span>
				<Button onClick={onNextClick}>Продолжить</Button>
			</div>
		</Panel>
	);
};
