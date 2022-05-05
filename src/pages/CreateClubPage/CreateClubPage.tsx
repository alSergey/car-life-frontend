import React, { useState } from "react";
import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";
import { useRouter } from "@happysanta/router";
import { ClubForm, CreateClubForm } from "../../components/CreateClubForm";
import { createNewClub } from "./api";
import { redirectClubPage } from "../../router";

interface Props {
	id: string;
	pagePrefix: string;
}

export const CreateClubPage: React.FC<Props> = ({ id, pagePrefix }) => {
	const router = useRouter();

	const [loading, setLoading] = useState(false);

	const handleSubmit = async (form: ClubForm): Promise<void> => {
		setLoading(true);
		try {
			const clubId = await createNewClub(form);
			if (!clubId) return;

			redirectClubPage(router, pagePrefix, { clubId });
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Panel id={id}>
			<PanelHeader left={<PanelHeaderBack onClick={() => router.popPage()} />}>
				Новый клуб
			</PanelHeader>
			<CreateClubForm loading={loading} onSubmit={handleSubmit} />
		</Panel>
	);
};
