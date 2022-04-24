import React from "react";
import { Gallery } from "@vkontakte/vkui";
import styles from "./CarHeader.module.css";

interface Prop {
	img: string;
}

export const CarHeader: React.FC<Prop> = ({ img }) => (
	<div>
		<Gallery>
			<img src={img} className={styles.img} alt="" />
		</Gallery>
	</div>
);
