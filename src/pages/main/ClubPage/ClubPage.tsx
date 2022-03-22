import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";
import React, { useEffect, useState } from "react";

import styles from "./ClubPage.module.css";
import { emptyClubData, getClub } from "./api";

interface Props {
	id: string;
	clubId: number;
	onBackClick: () => void;
}

export const ClubPage: React.FC<Props> = ({ id, clubId, onBackClick }) => {
	const [clubData, setClubData] = useState(emptyClubData);

	const handleGetClubData = async (): Promise<void> => {
		try {
			const data = await getClub(clubId);
			setClubData(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		handleGetClubData();
	}, []);

	return (
		<Panel id={id}>
			<PanelHeader
				left={
					<PanelHeaderBack className={styles.backIcon} onClick={onBackClick} />
				}
			>
				Клуб
			</PanelHeader>
		</Panel>
	);
};
