import React from "react";
import {
	Button,
	Div,
	Panel,
	PanelHeader,
	PanelHeaderBack,
} from "@vkontakte/vkui";
import styles from "./ThirdStory.module.css";
import image from "./thirdStory.jpg";

interface Props {
	id: string;
	onNextClick: () => void;
	onBackClick: () => void;
	onSkipClick: () => void;
}

export const ThirdStory: React.FC<Props> = ({
	id,
	onNextClick,
	onSkipClick,
	onBackClick,
}) => {
	return (
		<Panel id={id} centered>
			<PanelHeader left={<PanelHeaderBack onClick={onBackClick} />} />
			<Div className={styles.container}>
				<img className={styles.storyImage} src={image} alt={""} />
				<div className={styles.buttonsContainer}>
					<Button size="l" mode="tertiary" onClick={onSkipClick}>
						Пропустить
					</Button>
					<Button size="l" mode="outline" onClick={onNextClick}>
						Заполнить сейчас
					</Button>
				</div>
			</Div>
		</Panel>
	);
};
