import { Group, Header } from "@vkontakte/vkui";
import React, { useEffect, useState } from "react";
import { ClubList } from "../../../components/ClubList";
import {
	emptyAdminClubList,
	emptyMemberClubList,
	getAdminClubList,
	getMemberClubList,
} from "./api";

interface Props {
	userId: number;
	onClick: (id: number) => void;
}

export const ProfileClub: React.FC<Props> = ({ userId, onClick }) => {
	const [adminClubList, setAdminClubList] = useState(emptyAdminClubList);
	const [memberClubList, setMemberClubList] = useState(emptyMemberClubList);

	const handleGetAdminClubList = async (): Promise<void> => {
		try {
			const data = await getAdminClubList(userId);
			setAdminClubList(data);
		} catch (err) {
			console.error(err);
		}
	};

	const handleGetMemberClubList = async (): Promise<void> => {
		try {
			const data = await getMemberClubList(userId);
			setMemberClubList(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		handleGetAdminClubList();
		handleGetMemberClubList();
	}, []);

	return (
		<div>
			<Group>
				<Header>Админ клуба</Header>
				<ClubList clubList={adminClubList} onClick={onClick} />
			</Group>
			<Group>
				<Header>Участник клуба</Header>
				<ClubList clubList={memberClubList} onClick={onClick} />
			</Group>
		</div>
	);
};
