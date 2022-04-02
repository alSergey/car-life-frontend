import React from "react";
import { Footer } from "@vkontakte/vkui";
import { UserCard } from "./UserCard";

interface UserInfo {
	vkid: number;
	name: string;
	surname: string;
	avatar_url: string;
}

interface Props {
	userList: UserInfo[];
	onApprove?: (id: number) => void;
	onReject?: (id: number) => void;
	onClick: (id: number) => void;
}

export const UserList: React.FC<Props> = ({
	userList,
	onApprove,
	onReject,
	onClick,
}) => (
	<div>
		<div>
			{userList.map(({ vkid, name, surname, avatar_url }) => (
				<UserCard
					key={vkid}
					name={name}
					surname={surname}
					img={avatar_url}
					onApprove={onApprove ? () => onApprove(vkid) : undefined}
					onReject={onReject ? () => onReject(vkid) : undefined}
					onClick={() => onClick(vkid)}
				/>
			))}
		</div>
		{userList.length === 0 && <Footer>Ничего не найдено</Footer>}
	</div>
);