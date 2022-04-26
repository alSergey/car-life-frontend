import React, { useEffect, useState } from "react";
import {
	Avatar,
	Button,
	Card,
	CardGrid,
	CardScroll,
	Div,
	ModalRoot,
	SimpleCell,
	SplitLayout,
	Text,
} from "@vkontakte/vkui";
import styles from "./EventsPosts.module.css";
import { Icon28AddOutline } from "@vkontakte/icons";
import { CreateEventPost } from "../CreateEventPost";
import { emptyEventPostsList, getEventPosts } from "./api";

interface Props {
	eventId: number;
}

const createModal = "create";

export const EventPosts: React.FC<Props> = ({ eventId }) => {
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
				onClose={() => setIsOpenAdd(null)}
				updateData={handleGetAllPosts}
				eventId={eventId}
			/>
		</ModalRoot>
	);

	return (
		<SplitLayout modal={modal}>
			<Div className={styles.container}>
				<CardGrid size="l" className={styles.cardContainer}>
					{posts.map((p) => (
						<Card key={p.id} mode="outline">
							<div style={{ height: "auto" }}>
								<SimpleCell
									before={<Avatar size={20} src={p.user.avatar_url} />}
								>
									{p.user.name} {p.user.surname}
								</SimpleCell>
								{!!p.attachments[0] && (
									<CardScroll showArrows size="s">
										{p.attachments.map((a) => (
											<Card
												className={styles.postPhoto}
												style={{
													backgroundImage: `url(${a})`,
												}}
											>
												<div
													style={{
														paddingBottom: "70%",
													}}
												/>
											</Card>
										))}
									</CardScroll>
								)}
								<Text className={styles.postText} weight="regular">
									{p.text}
								</Text>
							</div>
						</Card>
					))}
				</CardGrid>
				{!isOpenAdd && (
					<Button
						className={styles.addButton}
						size="l"
						style={{ width: 55, height: 55 }}
						mode="secondary"
						before={<Icon28AddOutline width={35} height={35} />}
						onClick={() => setIsOpenAdd(createModal)}
					/>
				)}
			</Div>
		</SplitLayout>
	);
};
