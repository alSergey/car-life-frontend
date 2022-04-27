import React, { useEffect, useState } from "react";
import { emptyOwnerClubs, getOwnerClubList, OwnerClub } from "./api";
import { Avatar, CustomSelect, CustomSelectOption } from "@vkontakte/vkui";
import styles from "./OwnerClubWidget.module.css";

interface Props {
	selected?: OwnerClub | null;
	onChange: (option: OwnerClub) => void;
}

export const OwnerClubWidget: React.FC<Props> = ({ selected, onChange }) => {
	const [ownerClubs, setOwnerClubs] = useState(emptyOwnerClubs);

	const handleGetOwnerClubs = async (): Promise<void> => {
		try {
			const data = await getOwnerClubList();
			setOwnerClubs(data);
		} catch (err) {
			console.error(err);
		}
	};

	const handleChange = (clickValue: number): void => {
		const data = ownerClubs.find(({ value }) => clickValue === value);
		if (!data) return;

		onChange(data);
	};

	useEffect(() => {
		handleGetOwnerClubs();
	}, []);

	return (
		<CustomSelect
			value={selected?.value}
			options={ownerClubs}
			placeholder="Не указано"
			onChange={({ target: { value } }) => handleChange(Number(value))}
			renderOption={({ option, ...restProps }) => (
				<CustomSelectOption
					{...restProps}
					before={
						<Avatar className={styles.avatar} size={24} src={option.avatar} />
					}
				/>
			)}
		/>
	);
};
