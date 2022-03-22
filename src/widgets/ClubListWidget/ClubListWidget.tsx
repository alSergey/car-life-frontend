import React, { useEffect, useState } from "react";
import { CardGrid, Footer } from "@vkontakte/vkui";
import { ClubCard } from "./ClubCard";
import { defaultClubList, getClubList } from "./api";

interface Props {
	searchText: string;
	onClick: (id: number) => void;
}

export const ClubListWidget: React.FC<Props> = ({ searchText, onClick }) => {
	const [clubList, setClubList] = useState(defaultClubList);

	const handleGetClubList = async (): Promise<void> => {
		try {
			const data = await getClubList(searchText);
			setClubList(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		handleGetClubList();
	}, [searchText]);

	return (
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
};
