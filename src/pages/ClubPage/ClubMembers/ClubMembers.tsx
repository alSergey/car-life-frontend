import React, { useEffect, useState } from "react";
import { Group } from "@vkontakte/vkui";
import { UserCard, UserList } from "../../../components/UserList";
import { CounterHeader } from "../../../components/CounterHeader";
import {
	emptyClubMembersList,
	emptyClubMembersRequestList,
	getClubMembersList,
	getClubMembersRequestList,
	memberClubApproveReject,
} from "./api";

interface Props {
	clubId: number;
	membersCount: number;
	userStatus: string;
	onClick: (id: number) => void;
}

export const ClubMembers: React.FC<Props> = ({
	clubId,
	membersCount,
	userStatus,
	onClick,
}) => {
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
		if (userStatus !== "admin") return;

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
			{userStatus === "admin" && (
				<Group>
					<CounterHeader
						length={membersRequestList.length}
						text="Список заявок"
						mode="prominent"
					/>
					<UserList
						userList={membersRequestList}
						onClick={onClick}
						onApprove={(id) => handleApproveReject(id, "approve")}
						onReject={(id) => handleApproveReject(id, "reject")}
					/>
				</Group>
			)}
			<Group>
				<CounterHeader
					length={membersCount}
					text="Список участников"
					mode="primary"
				/>
				{membersList[0] && (
					<UserCard
						name={membersList[0].name}
						surname={membersList[0].surname}
						description="Администратор"
						img={membersList[0].avatar_url}
						onClick={() => onClick(membersList[0].vkid)}
					/>
				)}
				<UserList userList={membersList} onClick={onClick} />
			</Group>
		</div>
	);
};
