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

	useEffect(() => {
		const handleGetAllPosts = async (): Promise<void> => {
			try {
				const data = await getEventPosts(eventId);
				setPosts(data);
			} catch (err) {
				console.error(err);
			}
		};

		// handleGetAllPosts();
	}, []);

	const modal = (
		<ModalRoot activeModal={isOpenAdd}>
			<CreateEventPost id={createModal} onClose={() => setIsOpenAdd(null)} />
		</ModalRoot>
	);

	const url =
		"https://images.unsplash.com/photo-1603988492906-4fb0fb251cf8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80";
	return (
		<SplitLayout modal={modal}>
			<Div className={styles.container}>
				<CardGrid size="l" className={styles.cardContainer}>
					{posts.map((p) => (
						<Card key={p.vkid} mode="outline">
							<div style={{ height: "auto" }}>
								<SimpleCell
									before={<Avatar size={20} src={p.user.avatar_url} />}
								>
									{p.user.name} {p.user.surname}
								</SimpleCell>
								<CardScroll size="s">
									{p.attachments &&
										p.attachments.map((a, index) => (
											<Card
												className={styles.postPhoto}
												style={{
													backgroundImage: `url(${a[index]})`,
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
