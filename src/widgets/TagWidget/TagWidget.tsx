import React, { useEffect, useState } from "react";
import { ChipsSelect } from "@vkontakte/vkui/unstable";
import { ClubTags, emptyClubTags, getTagsList } from "./api";

interface Props {
	values: ClubTags[];
	onChange: (option: ClubTags[]) => void;
}

export const TagWidget: React.FC<Props> = ({ values, onChange }) => {
	const [tags, setTags] = useState(emptyClubTags);

	const handleGetTags = async (): Promise<void> => {
		try {
			const data = await getTagsList();
			setTags(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		handleGetTags();
	}, []);

	return (
		<ChipsSelect
			value={values}
			options={tags}
			placeholder="Не выбраны"
			onChange={(value) => onChange(value)}
		/>
	);
};
