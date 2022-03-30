import React from "react";
import { Button, Div, Panel } from "@vkontakte/vkui";
import styles from "./WelcomePage.module.css";

interface Props {
	id: string;
	onNextClick: () => void;
}

export const WelcomePage: React.FC<Props> = ({ id, onNextClick }) => {
	return (
		<Panel id={id} centered>
			<Div className={styles.container}>
				<span>
					Мы рады видеть тебя на просторах нашего сообщества, где ты можешь
					найти клубы по интересам, активные движухи, похвастаться своим авто.
				</span>
				<Button size="l" onClick={onNextClick}>
					Продолжить
				</Button>
			</Div>
		</Panel>
	);
};
