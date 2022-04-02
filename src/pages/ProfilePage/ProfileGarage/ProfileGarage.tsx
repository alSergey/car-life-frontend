import React from "react";
import { GarageData } from "../api/api.types";
import { GarageList } from "../../../components/GarageList";
import { Avatar, Card, Text } from "@vkontakte/vkui";
import image from "./add-car.png";
import {
	Icon20AddCircleFillGray,
	Icon56AddCircleOutline,
} from "@vkontakte/icons";

interface Props {
	garageList: GarageData[];
}

export const ProfileGarage: React.FC<Props> = ({ garageList }) => {
	return (
		<div>
			<GarageList garageList={garageList} onClick={() => {}} />
			<Card
				style={{
					padding: "10px",
					marginRight: 24,
					marginLeft: 24,
				}}
			>
				<div
					style={{
						height: 150,
						opacity: 0.5,
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Icon56AddCircleOutline
						fill={"#808080"}
						style={{ marginBottom: 8 }}
					/>
					<Text weight={"regular"} size={3}>
						Добавить машину
					</Text>
				</div>
			</Card>
		</div>
	);
};
