import React from "react";
import {
	Button,
	Div,
	Panel,
	PanelHeader,
	PanelHeaderBack,
} from "@vkontakte/vkui";
import styles from "./FirstStory.module.css";
import image from "./firstPage.jpg";

interface Props {
	id: string;
	onNextClick: () => void;
	onBackClick: () => void;
}

export const FirstStory: React.FC<Props> = ({
	id,
	onNextClick,
	onBackClick,
}) => {
	return (
		<Panel id={id} centered>
			<PanelHeader left={<PanelHeaderBack onClick={onBackClick} />} />
			<Div className={styles.container}>
				<img className={styles.storyImage} src={image} alt={""} />
				<Button mode="outline" size="l" onClick={onNextClick}>
					Круто
				</Button>
			</Div>
		</Panel>
	);
};
