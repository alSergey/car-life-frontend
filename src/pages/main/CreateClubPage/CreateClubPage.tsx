import React from "react";
import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";
import { CreateClubWidget } from "../../../widgets/CreateClubWidget";

import styles from "./CreateClubPage.module.css";

interface Props {
	id: string;
	onBackClick: () => void;
	onSubmit: (clubId: number) => void;
}

export const CreateClubPage: React.FC<Props> = ({
	id,
	onBackClick,
	onSubmit,
}) => (
	<Panel id={id}>
		<PanelHeader
			left={
				<PanelHeaderBack className={styles.backIcon} onClick={onBackClick} />
			}
		>
			Новый клуб
		</PanelHeader>
		<CreateClubWidget onSubmit={onSubmit} />
	</Panel>
);
