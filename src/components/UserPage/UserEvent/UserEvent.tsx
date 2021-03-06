import { Group, Header } from "@vkontakte/vkui";
import React, { useEffect, useState } from "react";
import { EventList } from "../../EventList";
import { AddButton } from "../../AddButton";
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
	onCreateClick?: () => void;
}

export const UserEvent: React.FC<Props> = ({
	userId,
	onClick,
	onCreateClick,
}) => {
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
				<EventList
					scrollType="horizontal"
					eventList={adminEventList}
					onClick={onClick}
				/>
			</Group>
			<Group>
				<Header>Участник события</Header>
				<EventList
					scrollType="horizontal"
					eventList={memberEventList}
					onClick={onClick}
				/>
			</Group>
			<Group>
				<Header>Зритель события</Header>
				<EventList
					scrollType="horizontal"
					eventList={viewerEventList}
					onClick={onClick}
				/>
			</Group>
			{onCreateClick && <AddButton onClick={onCreateClick} />}
		</div>
	);
};
