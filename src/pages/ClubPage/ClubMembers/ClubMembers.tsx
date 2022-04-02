import React, { useEffect, useState } from "react";
import { Group, Header } from "@vkontakte/vkui";
import { UserList } from "../../../components/UserList";
import {
	emptyClubMembersList,
	emptyClubMembersRequestList,
	getClubMembersList,
	getClubMembersRequestList,
	memberClubApproveReject,
} from "./api";

interface Props {
	clubId: number;
	onClick: (id: number) => void;
}

export const ClubMembers: React.FC<Props> = ({ clubId, onClick }) => {
	const [membersList, setMembersList] = useState(emptyClubMembersList);
	const [membersRequestList, setMembersRequestList] = useState(
		emptyClubMembersRequestList
	);

	const handleGetMembersList = async (): Promise<void> => {
		try {
			const data = await getClubMembersList(clubId);
			setMembersList(data);
		} catch (err) {
			console.error(err);
		}
	};

	const handleGetMembersRequestList = async (): Promise<void> => {
		try {
			const data = await getClubMembersRequestList(clubId);
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
			await memberClubApproveReject(clubId, userId, type);
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
