import React from "react";
import { Avatar, Card, Gallery, Header, Text } from "@vkontakte/vkui";
import styles from "./EventPostCard.module.css";

interface Props {
	images: string[];
	text: string;
	userAvatar: string;
	userName: string;
	userSurname: string;
	onUserClick: () => void;
}

export const EventPostCard: React.FC<Props> = ({
	images,
	text,
	userAvatar,
	userName,
	userSurname,
	onUserClick,
}) => (
	<Card mode="outline">
		<Header onClick={onUserClick}>
			<div className={styles.header}>
				<Avatar className={styles.avatar} size={36} src={userAvatar} />
				<span>
					{userName} {userSurname}
				</span>
			</div>
		</Header>
		{Boolean(images.length) && (
			<Gallery showArrows bullets={images.length > 1 && "dark"}>
				{images.map((src) => (
					<img key={src} className={styles.photos} src={src} alt="" />
				))}
			</Gallery>
		)}
		<Text className={styles.text} weight="regular">
			{text}
		</Text>
	</Card>
);
