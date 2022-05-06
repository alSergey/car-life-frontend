import React from "react";
import { Button } from "@vkontakte/vkui";
import styles from "./AddButton.module.css";
import { Icon28AddOutline } from "@vkontakte/icons";

interface Props {
	onClick: () => void;
}

export const AddButton: React.FC<Props> = ({ onClick }) => (
	<Button
		className={styles.addButton}
		size="l"
		style={{ width: 55, height: 55 }}
		mode="secondary"
		before={<Icon28AddOutline width={35} height={35} />}
		onClick={onClick}
	/>
);
