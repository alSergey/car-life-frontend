import React from "react";
import { Banner, Text } from "@vkontakte/vkui";
import { getPrettyYear } from "../../../constants/time";

interface Props {
	brand: string;
	model: string;
	name?: string;
	img: string;
	date: string;
}

export const CarCard: React.FC<Props> = ({ brand, model, name, img, date }) => {
	const dateYear = getPrettyYear(date);
	return (
		<Banner
			before={
				<div
					style={{
						width: "400px",
						height: "60px",
						position: "absolute",
						zIndex: 100,
						bottom: -10,
						left: -15,
						backgroundColor: "rgb(60, 60, 60, 0.7)",
					}}
				/>
			}
			size="m"
			mode="image"
			header={
				<div>
					<Text weight="semibold" size={2} style={{ paddingTop: "160px" }}>
						{!!name ? name : `${brand} ${model}`}
					</Text>
				</div>
			}
			subheader={
				<span>{!!name ? `${brand} ${model}, ${dateYear}` : dateYear}</span>
			}
			background={
				<div
					style={{
						backgroundColor: "rgba(131,131,131,0.46)",
						backgroundImage: `url(${img})`,
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat",
					}}
				/>
			}
			style={{ width: "100%" }}
		/>
	);
};
