import React from "react";
import { CardGrid } from "@vkontakte/vkui";
import { EventPostCard } from "./EventPostCard";

interface UserInfo {
	vkid: number;
	avatar_url: string;
	name: string;
	surname: string;
}

interface EventPostInfo {
	id: number;
	text: string;
	attachments: string[];
	user: UserInfo;
}

interface Props {
	postList: EventPostInfo[];
	onUserClick: (id: number) => void;
}

export const EventPostList: React.FC<Props> = ({ postList, onUserClick }) => (
	<CardGrid size="l">
		{postList.map((post) => (
			<EventPostCard
				key={post.id}
				images={post.attachments}
				text={post.text}
				userAvatar={post.user.avatar_url}
				userName={post.user.name}
				userSurname={post.user.surname}
				onUserClick={() => onUserClick(post.user.vkid)}
			/>
		))}
	</CardGrid>
);
