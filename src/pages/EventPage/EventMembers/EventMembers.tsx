import { Group, Header } from "@vkontakte/vkui";
import React, { useEffect, useState } from "react";
import {
	emptyEventMembersList,
	emptyEventMembersRequestList,
	getEventMembersRequestList,
	getEventMembersList,
	memberEventApproveReject,
} from "./api";
import { UserList } from "../../../components/UserList";

interface Props {
	eventId: number;
	onClick: (id: number) => void;
}

export const EventMembers: React.FC<Props> = ({ eventId, onClick }) => {
	const [membersList, setMembersList] = useState(emptyEventMembersList);
	const [membersRequestList, setMembersRequestList] = useState(
		emptyEventMembersRequestList
	);

	const handleGetMembersList = async (): Promise<void> => {
		try {
			const data = await getEventMembersList(eventId);
			setMembersList(data);
		} catch (err) {
			console.error(err);
		}
	};

	const handleGetMembersRequestList = async (): Promise<void> => {
		try {
			const data = await getEventMembersRequestList(eventId);
			setMembersRequestList(data);
		} catch (err) {
			console.error(err);
		}
	};

	const handleApproveReject = async (
		userId: number,
		type: "approve" | "reject"
	): Promise<void> => {
		try {
			await memberEventApproveReject(eventId, userId, type);
			handleGetMembersList();
			handleGetMembersRequestList();
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		handleGetMembersList();
		handleGetMembersRequestList();
	}, []);

	return (
		<div>
			<Group>
				<Header>Список заявок</Header>
				<UserList
					userList={membersRequestList}
					onClick={onClick}
					onApprove={(id) => handleApproveReject(id, "approve")}
					onReject={(id) => handleApproveReject(id, "reject")}
				/>
			</Group>
			<Group>
				<Header>Список участников</Header>
				<UserList userList={membersList} onClick={onClick} />
			</Group>
		</div>
	);
};
