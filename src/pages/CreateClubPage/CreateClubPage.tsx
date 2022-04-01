import React from "react";
import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";

import styles from "./CreateClubPage.module.css";
import { createNewClub } from "./api";
import { ClubForm, CreateClubForm } from "../../components/CreateClubForm";

interface Props {
	id: string;
	onBackClick?: () => void;
	onSubmit: (clubId: number) => void;
}

export const CreateClubPage: React.FC<Props> = ({
	id,
	onBackClick,
	onSubmit,
}) => {
	const handleSubmit = async (form: ClubForm): Promise<void> => {
		try {
			const clubId = await createNewClub(form);
			if (!clubId) return;

			onSubmit(clubId);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Panel id={id}>
			<PanelHeader
				left={
					onBackClick && (
						<PanelHeaderBack
							className={styles.backIcon}
							onClick={onBackClick}
						/>
					)
				}
			>
				Новый клуб
			</PanelHeader>
			<CreateClubForm onSubmit={handleSubmit} />
		</Panel>
	);
};
