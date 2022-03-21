import React, { useEffect, useState } from "react";
import { CardGrid, Footer } from "@vkontakte/vkui";
import { api } from "../../api";
import { ModelsEvent } from "../../api/Api";
import { ClubCard } from "./ClubCard";

interface Props {
	searchText: string;
	onClick: (id: number) => void;
}

const defaultClubList: ModelsEvent[] = [];

export const ClubListWidget: React.FC<Props> = ({ searchText, onClick }) => {
	const [clubList, setClubList] = useState(defaultClubList);

	const filteredClubList = React.useMemo(
		() => clubList.filter(({ name }) => name?.includes(searchText)),
		[clubList, searchText]
	);

	useEffect(() => {
		api.events
			.eventsList()
			.then(({ data }) => setClubList(data))
			.catch((err) => console.error(err));
	}, []);

	return (
		<div>
			<CardGrid size="m">
				{filteredClubList.map(({ id, name, avatar }) => (
					<ClubCard
						key={id}
						title={name}
						img={avatar}
						onClick={() => onClick(id)}
					/>
				))}
			</CardGrid>
			{filteredClubList.length === 0 && <Footer>Ничего не найдено</Footer>}
		</div>
	);
};
