import { Group, Header } from "@vkontakte/vkui";
import React, { useEffect, useState } from "react";
import { ClubList } from "../../ClubList";
import { AddButton } from "../../AddButton";
import {
	emptyAdminClubList,
	emptyMemberClubList,
	emptySubscriberClubList,
	getAdminClubList,
	getMemberClubList,
	getSubscriberClubList,
} from "./api";

interface Props {
	userId: number;
	onClick: (id: number) => void;
	onCreateClick?: () => void;
}

export const UserClub: React.FC<Props> = ({
	userId,
	onClick,
	onCreateClick,
}) => {
	const [adminClubList, setAdminClubList] = useState(emptyAdminClubList);
	const [memberClubList, setMemberClubList] = useState(emptyMemberClubList);
	const [subscriberClubList, setSubscriberClubList] = useState(
		emptySubscriberClubList
	);

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

	const handleGetSubscriberClubList = async (): Promise<void> => {
		try {
			const data = await getSubscriberClubList(userId);
			setSubscriberClubList(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		handleGetAdminClubList();
		handleGetMemberClubList();
		handleGetSubscriberClubList();
	}, []);

	return (
		<div>
			<Group>
				<Header>Админ клуба</Header>
				<ClubList
					scrollType="horizontal"
					clubList={adminClubList}
					onClick={onClick}
				/>
			</Group>
			<Group>
				<Header>Участник клуба</Header>
				<ClubList
					scrollType="horizontal"
					clubList={memberClubList}
					onClick={onClick}
				/>
			</Group>
			<Group>
				<Header>Подписчик клуба</Header>
				<ClubList
					scrollType="horizontal"
					clubList={subscriberClubList}
					onClick={onClick}
				/>
			</Group>
			{onCreateClick && <AddButton onClick={onCreateClick} />}
		</div>
	);
};
