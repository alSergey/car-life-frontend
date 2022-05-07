import React, { ReactNode, useContext, useEffect, useState } from "react";
import { ModalRoot, SplitLayout } from "@vkontakte/vkui";
import { emptyEventPostsList, getEventPosts } from "./api";
import { CreateEventPost } from "../CreateEventPost";
import { EventPostList } from "../../../components/EventPostList";
import { isAddButtonShown } from "./EventPosts.utils";
import { AddButton } from "../../../components/AddButton";
import { EventPostActionMenu } from "./EventPostActionMenu";
import { UserContext } from "../../../context/userContext";

interface Props {
	eventId: number;
	setPopout: (popout: ReactNode | null) => void;
	userStatus: string;
	onUserClick: (id: number) => void;
}

const createModal = "create";

export const EventPosts: React.FC<Props> = ({
	eventId,
	setPopout,
	userStatus,
	onUserClick,
}) => {
	const { userState } = useContext(UserContext);
	const [isOpenAdd, setIsOpenAdd] = useState<string | null>(null);
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
	}, []);

	const modal = (
		<ModalRoot activeModal={isOpenAdd}>
			<CreateEventPost
				id={createModal}
				eventId={eventId}
				onClose={() => setIsOpenAdd(null)}
				onCreate={() => {
					setIsOpenAdd(null);
					handleGetAllPosts();
				}}
			/>
		</ModalRoot>
	);

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
		<SplitLayout modal={modal}>
			<EventPostList
				postList={posts}
				onActionMenuClick={({ id, user }) => openPopout(id, user.vkid)}
				onUserClick={onUserClick}
			/>
			{!isOpenAdd && isAddButtonShown(userStatus) && (
				<AddButton onClick={() => setIsOpenAdd(createModal)} />
			)}
		</SplitLayout>
	);
};
