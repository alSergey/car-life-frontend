import React from "react";
import { Avatar, Text, Div } from "@vkontakte/vkui";
import styles from "./ClubHeader.module.css";
import { ClubButtons } from "./ClubButtons";
import { ClubData } from "../api";

interface Prop {
	clubData: ClubData;
	onButtonClick: () => void;
}

const getRandom = (min: number, max: number): number => {
	return Math.ceil(Math.random() * (max - min) + min);
};

export const ClubHeader: React.FC<Prop> = ({ clubData, onButtonClick }) => (
	<Div>
		<div className={styles.top}>
			<div>
				<Text weight="3" className={styles.desc}>
					Инфо о клубе
				</Text>
				<Text weight="3" className={styles.descText}>
					{clubData.description}
				</Text>
			</div>
			<Avatar
				className={styles.avatar}
				mode="image"
				size={160}
				src={clubData.avatar}
			/>
		</div>
		<div className={styles.tags}>
			{clubData.tags.map((t) => (
				<Text
					key={t}
					weight="3"
					className={styles.tag}
					style={{
						backgroundColor: `rgba(${getRandom(0, 255)}, ${getRandom(
							0,
							255
						)}, ${getRandom(0, 255)}, 0.3)`,
					}}
				>
					{t}
				</Text>
			))}
		</div>
		<ClubButtons
			clubId={clubData.id}
			userStatus={clubData.userStatus}
			onClick={onButtonClick}
		/>
	</Div>
);
