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
					найти автоклубы по интересам, активные движухи, похвастаться своим
					авто.
				</span>
				<Button mode="tertiary" size="l" onClick={onNextClick}>
					Что тебя ждет?
				</Button>
			</Div>
		</Panel>
	);
};
