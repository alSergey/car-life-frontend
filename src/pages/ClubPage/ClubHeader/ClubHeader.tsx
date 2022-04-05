import React from "react";
import { Avatar, Text, Div } from "@vkontakte/vkui";
import styles from "./ClubHeader.module.css";
import { ClubButtons } from "./ClubButtons";
import { ClubData } from "../api";

interface Prop {
	clubData: ClubData;
	onButtonClick: () => void;
}

export const ClubHeader: React.FC<Prop> = ({ clubData, onButtonClick }) => (
	<Div>
		<div className={styles.top}>
			<div>
				<Text weight="regular">{clubData.tags.join(", ")}</Text>
				<Text weight="regular" className={styles.desc}>
					{clubData.description}
				</Text>
			</div>
			<Avatar size={96} src={clubData.avatar} />
		</div>
		<ClubButtons
			clubId={clubData.id}
			userStatus={clubData.userStatus}
			onClick={onButtonClick}
		/>
	</Div>
);
