import React from "react";
import { Button, Panel } from "@vkontakte/vkui";
import styles from "./WelcomePage.module.css";

interface Props {
	id: string;
	onNextClick: () => void;
}

export const WelcomePage: React.FC<Props> = ({ id, onNextClick }) => {
	return (
		<Panel id={id} centered>
			<div className={styles.container}>
				<span>Добро пожаловать в приложение для водителей</span>
				<Button onClick={onNextClick}>Продолжить</Button>
			</div>
		</Panel>
	);
};
