import React from "react";
import { CardGrid, Footer } from "@vkontakte/vkui";
import { ClubCard } from "./ClubCard";

interface ClubInfo {
	id: number;
	name: string;
	avatar: string;
	participants_count: number;
}

interface Props {
	clubList: ClubInfo[];
	onClick: (id: number) => void;
}

export const ClubList: React.FC<Props> = ({ clubList, onClick }) => (
	<div>
		<CardGrid size="m">
			{clubList.map(({ id, name, avatar, participants_count }) => (
				<ClubCard
					key={id}
					title={name}
					subscribers={participants_count}
					img={avatar}
					onClick={() => onClick(id)}
				/>
			))}
		</CardGrid>
		{clubList.length === 0 && <Footer>Ничего не найдено</Footer>}
	</div>
);
