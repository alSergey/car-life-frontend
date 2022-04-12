import React from "react";
import {
	Button,
	Div,
	Panel,
	PanelHeader,
	PanelHeaderBack,
} from "@vkontakte/vkui";
import styles from "./SecondStory.module.css";
import image from "./secondStory.jpg";

interface Props {
	id: string;
	onNextClick: () => void;
	onBackClick: () => void;
}

export const SecondStory: React.FC<Props> = ({
	id,
	onNextClick,
	onBackClick,
}) => {
	return (
		<Panel id={id} centered>
			<PanelHeader left={<PanelHeaderBack onClick={onBackClick} />} />
			<Div className={styles.container}>
				<img className={styles.storyImage} src={image} alt={""} />
				<Button size="l" mode="tertiary" onClick={onNextClick}>
					Супер!
				</Button>
			</Div>
		</Panel>
	);
};
