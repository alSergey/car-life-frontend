import React from "react";
import { Avatar, IconButton, SimpleCell } from "@vkontakte/vkui";
import { Icon28DoneOutline, Icon28CancelAltOutline } from "@vkontakte/icons";

import styles from "./UserCard.module.css";

interface Props {
	name: string;
	surname: string;
	img: string;
	onClick: () => void;
	onApprove?: () => void;
	onReject?: () => void;
}

export const UserCard: React.FC<Props> = ({
	name,
	surname,
	img,
	onClick,
	onApprove,
	onReject,
}) => (
	<SimpleCell
		before={<Avatar className={styles.avatar} size={40} src={img} />}
		onClick={onClick}
		after={
			<div className={styles.container}>
				{onApprove && (
					<IconButton
						className={styles.approve}
						onClick={(e) => {
							e.stopPropagation();
							onApprove();
						}}
					>
						<Icon28DoneOutline />
					</IconButton>
				)}
				{onReject && (
					<IconButton
						className={styles.reject}
						onClick={(e) => {
							e.stopPropagation();
							onReject();
						}}
					>
						<Icon28CancelAltOutline />
					</IconButton>
				)}
			</div>
		}
	>
		{surname} {name}
	</SimpleCell>
);
