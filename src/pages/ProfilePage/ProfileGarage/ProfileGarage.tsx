import React from "react";
import { CarList } from "../../../components/CarList";
import { Card, Text } from "@vkontakte/vkui";
import { Icon56AddCircleOutline } from "@vkontakte/icons";

interface Props {
	userId: number;
}

export const ProfileGarage: React.FC<Props> = ({ userId }) => {
	return (
		<div>
			<CarList carList={[]} onClick={() => {}} />
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
