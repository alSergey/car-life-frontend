import React, { useState } from "react";
import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";
import { useRouter } from "@happysanta/router";
import { CarForm, CreateCarFom } from "../../components/CreateCarForm";
import { createNewCar } from "./api";
import { redirectCarPage } from "../../router";

interface Props {
	id: string;
	pagePrefix: string;
}

export const CreateCarPage: React.FC<Props> = ({ id, pagePrefix }) => {
	const router = useRouter();

	const [loading, setLoading] = useState(false);

	const handleSubmit = async (form: CarForm): Promise<void> => {
		setLoading(true);
		try {
			const carId = await createNewCar(form);
			if (!carId) return;

			redirectCarPage(router, pagePrefix, { carId });
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Panel id={id}>
			<PanelHeader left={<PanelHeaderBack onClick={() => router.popPage()} />}>
				Новая машина
			</PanelHeader>
			<CreateCarFom loading={loading} onSubmit={handleSubmit} />
		</Panel>
	);
};
