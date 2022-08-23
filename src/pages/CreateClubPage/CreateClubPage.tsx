import React, { useState } from "react";
import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";

import { createNewClub } from "./api";
import { ClubForm, CreateClubForm } from "../../components/CreateClubForm";

interface Props {
	id: string;
	onBackClick: () => void;
	onSubmit: (clubId: number) => void;
}

export const CreateClubPage: React.FC<Props> = ({
	id,
	onBackClick,
	onSubmit,
}) => {
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (form: ClubForm): Promise<void> => {
		setLoading(true);
		try {
			const clubId = await createNewClub(form);
			if (!clubId) return;

			onSubmit(clubId);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Panel id={id}>
			<PanelHeader before={<PanelHeaderBack onClick={onBackClick} />}>
				Новый клуб
			</PanelHeader>
			<CreateClubForm loading={loading} onSubmit={handleSubmit} />
		</Panel>
	);
};
