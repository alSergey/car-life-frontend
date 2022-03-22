import React from "react";
import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";
import { CreateEventWidget } from "../../../widgets/CreateEventWidget";

import styles from "./CreateEventPage.module.css";

interface Props {
	id: string;
	onBackClick: () => void;
	onSubmit: (eventId: number) => void;
}

export const CreateEventPage: React.FC<Props> = ({
	id,
	onSubmit,
	onBackClick,
}) => (
	<Panel id={id}>
		<PanelHeader
			left={
				<PanelHeaderBack className={styles.backIcon} onClick={onBackClick} />
			}
		>
			Новое событие
		</PanelHeader>
		<CreateEventWidget onSubmit={onSubmit} />
	</Panel>
);
