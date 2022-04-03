import { Group, Header } from "@vkontakte/vkui";
import React, { useEffect, useState } from "react";
import { EventList } from "../../../components/EventList";
import {
	emptyAdminEventList,
	emptyMemberEventList,
	emptyViewerEventList,
	getAdminEventList,
	getMemberEventList,
	getViewerEventList,
} from "./api";

interface Props {
	userId: number;
	onClick: (id: number) => void;
}

export const ProfileEvent: React.FC<Props> = ({ userId, onClick }) => {
	const [adminEventList, setAdminEventList] = useState(emptyAdminEventList);
	const [memberEventList, setMemberEventList] = useState(emptyMemberEventList);
	const [viewerEventList, setViewerEventList] = useState(emptyViewerEventList);

	const handleGetAdminEventList = async (): Promise<void> => {
		try {
			const data = await getAdminEventList(userId);
			setAdminEventList(data);
		} catch (err) {
			console.error(err);
		}
	};

	const handleGetMemberEventList = async (): Promise<void> => {
		try {
			const data = await getMemberEventList(userId);
			setMemberEventList(data);
		} catch (err) {
			console.error(err);
		}
	};

	const handleGetViewerEventList = async (): Promise<void> => {
		try {
			const data = await getViewerEventList(userId);
			setViewerEventList(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		handleGetAdminEventList();
		handleGetMemberEventList();
		handleGetViewerEventList();
	}, []);

	return (
		<div>
			<Group>
				<Header>Организатор события</Header>
				<EventList eventList={adminEventList} onClick={onClick} />
			</Group>
			<Group>
				<Header>Участник события</Header>
				<EventList eventList={memberEventList} onClick={onClick} />
			</Group>
			<Group>
				<Header>Зритель события</Header>
				<EventList eventList={viewerEventList} onClick={onClick} />
			</Group>
		</div>
	);
};
