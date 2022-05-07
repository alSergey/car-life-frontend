import React, { ReactNode } from "react";
import { CardGrid, CardScroll, Footer } from "@vkontakte/vkui";
import { ClubCard } from "./ClubCard";

interface ClubInfo {
	id: number;
	name: string;
	avatar: string;
	participants_count: number;
	subscribers_count: number;
}

interface Props {
	clubList: ClubInfo[];
	scrollType?: "vertical" | "horizontal";
	onClick: (id: number) => void;
}

export const ClubList: React.FC<Props> = ({
	clubList,
	scrollType,
	onClick,
}) => {
	const getCardList = (): ReactNode =>
		clubList.map(
			({ id, name, avatar, participants_count, subscribers_count }) => (
				<ClubCard
					key={id}
					title={name}
					members={participants_count}
					subscribers={subscribers_count}
					img={avatar}
					onClick={() => onClick(id)}
				/>
			)
		);

	return (
		<div style={{ width: "100%" }}>
			{scrollType === "horizontal" ? (
				<CardScroll size="s">{getCardList()}</CardScroll>
			) : (
				<CardGrid size="m">{getCardList()}</CardGrid>
			)}
			{clubList.length === 0 && <Footer>Ничего не найдено</Footer>}
		</div>
	);
};
