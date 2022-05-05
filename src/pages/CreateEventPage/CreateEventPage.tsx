import React, { useState } from "react";
import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";
import { useRouter } from "@happysanta/router";
import { CreateEventForm, EventForm } from "../../components/CreateEventForm";
import { createNewEvent } from "./api";
import { redirectEventPage } from "../../router";

interface Props {
	id: string;
	pagePrefix: string;
}

export const CreateEventPage: React.FC<Props> = ({ id, pagePrefix }) => {
	const router = useRouter();

	const [loading, setLoading] = useState(false);

	const handleSubmit = async (form: EventForm): Promise<void> => {
		setLoading(true);
		try {
			const eventId = await createNewEvent(form);
			if (!eventId) return;

			redirectEventPage(router, pagePrefix, { eventId });
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Panel id={id}>
			<PanelHeader left={<PanelHeaderBack onClick={() => router.popPage()} />}>
				Новое событие
			</PanelHeader>
			<CreateEventForm loading={loading} onSubmit={handleSubmit} />
		</Panel>
	);
};
