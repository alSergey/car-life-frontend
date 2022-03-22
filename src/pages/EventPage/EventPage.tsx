import {
	Button,
	Div,
	Group,
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Title,
} from "@vkontakte/vkui";
import React, { useEffect, useState } from "react";
import {
	ID_GARAGE,
	ID_INFO,
	ID_MEMBERS,
	ID_POSTS,
} from "../../constants/config";
import { apiGetEvent } from "./action/action";
import { emptyEventData } from "./action/action.consts";
import { EventInfo } from "../../components/EventInfo";
import { EventMembers } from "../../widgets/EventMembers";
import { EventGarage } from "../../widgets/EventGarage";
import { EventPosts } from "../../widgets/EventPosts";
import { EventBar } from "../../components/EventBar";

interface Props {
	id: string;
	eventPage: number;
	onClick: () => void;
}

export const EventPage: React.FC<Props> = (props) => {
	const [activeTab, setActiveTab] = useState(ID_INFO);
	const [eventData, setEventData] = useState(emptyEventData);
	const { id, eventPage, onClick } = props;

	const getData = async (): Promise<void> => {
		try {
			const data = await apiGetEvent(eventPage);
			setEventData(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<Panel id={id}>
			<PanelHeader left={<PanelHeaderBack onClick={onClick} />}>
				Событие
			</PanelHeader>
			<img src={eventData.avatar} alt="" />
			<Group separator="hide" style={{ marginLeft: 15 }}>
				<Title level="1" style={{ marginBottom: 16 }} weight="bold">
					{eventData.name}
				</Title>
				<Title level="3" weight="semibold">
					{new Date(eventData.event_date).toLocaleString()}
				</Title>
				<Div
					style={{ justifyContent: "center", paddingBottom: 0, paddingLeft: 0 }}
				>
					<Button mode="outline" size="m" type="submit" width={200}>
						Участвовать
					</Button>
				</Div>
			</Group>
			<EventBar activeTab={activeTab} setActive={setActiveTab} />
			{activeTab === ID_INFO && (
				<EventInfo description={eventData.description} />
			)}
			{activeTab === ID_MEMBERS && <EventMembers id={eventData.id} />}
			{activeTab === ID_GARAGE && <EventGarage id={eventData.id} />}
			{activeTab === ID_POSTS && <EventPosts id={eventData.id} />}
		</Panel>
	);
};
