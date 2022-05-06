import React, { useEffect, useState } from "react";
import { ModalRoot, SplitLayout } from "@vkontakte/vkui";
import { emptyEventPostsList, getEventPosts } from "./api";
import { CreateEventPost } from "../CreateEventPost";
import { EventPostList } from "../../../components/EventPostList";
import { isAddButtonShown } from "./EventPosts.utils";
import { AddButton } from "../../../components/AddButton";

interface Props {
	eventId: number;
	userStatus: string;
	onUserClick: (id: number) => void;
}

const createModal = "create";

export const EventPosts: React.FC<Props> = ({
	eventId,
	userStatus,
	onUserClick,
}) => {
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

	return (
		<SplitLayout modal={modal}>
			<EventPostList postList={posts} onUserClick={onUserClick} />
			{!isOpenAdd && isAddButtonShown(userStatus) && (
				<AddButton onClick={() => setIsOpenAdd(createModal)} />
			)}
		</SplitLayout>
	);
};
