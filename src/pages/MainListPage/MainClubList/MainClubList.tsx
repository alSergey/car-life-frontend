import React, { useEffect, useState } from "react";
import { defaultClubList, getClubList } from "./api";
import { ClubList } from "../../../components/ClubList";

interface Props {
	searchText: string;
	onClick: (id: number) => void;
}

export const MainClubList: React.FC<Props> = ({ searchText, onClick }) => {
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

	return <ClubList clubList={clubList} onClick={onClick} />;
};
