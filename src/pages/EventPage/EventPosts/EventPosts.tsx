import React, { ReactNode, useContext, useEffect, useState } from "react";
import { emptyEventPostsList, getEventPosts } from "./api";
import { EventPostList } from "../../../components/EventPostList";
import { isAddButtonShown } from "./EventPosts.utils";
import { AddButton } from "../../../components/AddButton";
import { EventPostActionMenu } from "./EventPostActionMenu";
import { UserContext } from "../../../context/userContext";
import { useLocation, useRouter } from "@happysanta/router";
import {
	CREATE_EVENT_POST_MODAL,
	setCreateEventPostModalQuery,
} from "../../../router";

interface Props {
	eventId: number;
	setPopout: (popout: ReactNode | null) => void;
	userStatus: string;
	onUserClick: (id: number) => void;
}

export const EventPosts: React.FC<Props> = ({
	eventId,
	setPopout,
	userStatus,
	onUserClick,
}) => {
	const location = useLocation();
	const router = useRouter();
	const { userState } = useContext(UserContext);

	const [posts, setPosts] = useState(emptyEventPostsList);

	const handleGetAllPosts = async (): Promise<void> => {
		try {
			const data = await getEventPosts(eventId);
			setPosts(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		handleGetAllPosts();
	}, [location.getModalId()]);

	const openPopout = (postId: number, userId: number) => {
		setPopout(
			<EventPostActionMenu
				postId={postId}
				userStatus={userId === userState.id ? "owner" : "unknown"}
				onClose={() => setPopout(null)}
				onDelete={handleGetAllPosts}
			/>
		);
	};

	return (
		<div>
			<EventPostList
				postList={posts}
				onActionMenuClick={({ id, user }) => openPopout(id, user.vkid)}
				onUserClick={onUserClick}
			/>
			{!location.getModalId() && isAddButtonShown(userStatus) && (
				<AddButton
					onClick={() =>
						router.pushModal(
							CREATE_EVENT_POST_MODAL,
							setCreateEventPostModalQuery(eventId)
						)
					}
				/>
			)}
		</div>
	);
};
