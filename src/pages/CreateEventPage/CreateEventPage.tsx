import React, { useState } from "react";
import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";

import { createNewEvent } from "./api";
import { CreateEventForm, EventForm } from "../../components/CreateEventForm";

interface Props {
	id: string;
	onBackClick?: () => void;
	onSubmit: (eventId: number) => void;
}

export const CreateEventPage: React.FC<Props> = ({
	id,
	onSubmit,
	onBackClick,
}) => {
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (form: EventForm): Promise<void> => {
		setLoading(true);
		try {
			const eventId = await createNewEvent(form);
			if (!eventId) return;

			onSubmit(eventId);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Panel id={id}>
			<PanelHeader
				left={onBackClick && <PanelHeaderBack onClick={onBackClick} />}
			>
				Новое событие
			</PanelHeader>
			<CreateEventForm loading={loading} onSubmit={handleSubmit} />
		</Panel>
	);
};
