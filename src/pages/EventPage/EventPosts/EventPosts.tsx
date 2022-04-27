import React, { useEffect, useState } from "react";
import { Button, ModalRoot, SplitLayout } from "@vkontakte/vkui";
import styles from "./EventsPosts.module.css";
import { Icon28AddOutline } from "@vkontakte/icons";
import { emptyEventPostsList, getEventPosts } from "./api";
import { CreateEventPost } from "../CreateEventPost";
import { EventPostList } from "../../../components/EventPostList";
import { isAddButtonShown } from "./EventPosts.utils";

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
				<Button
					className={styles.addButton}
					size="l"
					style={{ width: 55, height: 55 }}
					mode="secondary"
					before={<Icon28AddOutline width={35} height={35} />}
					onClick={() => setIsOpenAdd(createModal)}
				/>
			)}
		</SplitLayout>
	);
};
