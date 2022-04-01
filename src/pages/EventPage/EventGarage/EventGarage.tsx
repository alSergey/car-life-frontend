import React from "react";
import { Gallery, Group, Header } from "@vkontakte/vkui";

interface Props {
	id: number;
}

export const EventGarage: React.FC<Props> = () => {
	return (
		<Group header={<Header mode="secondary">Вы увидите</Header>}>
			<Gallery
				slideWidth="100%"
				align="center"
				style={{ height: "300px" }}
				bullets="dark"
				showArrows
			>
				<div
					style={{
						backgroundImage:
							"url('https://i.ytimg.com/vi/0zler_phm3M/maxresdefault.jpg')",
						backgroundSize: "cover",
					}}
				/>
				<div
					style={{
						backgroundImage:
							"url('https://i.pinimg.com/originals/8b/33/dc/8b33dce321d56d9bf1248981d276864f.jpg')",
						backgroundSize: "cover",
					}}
				/>
				<div
					style={{
						backgroundImage: "url('https://a.d-cd.net/ee6e5a6s-960.jpg')",
						backgroundSize: "cover",
					}}
				/>
			</Gallery>
		</Group>
	);
};
