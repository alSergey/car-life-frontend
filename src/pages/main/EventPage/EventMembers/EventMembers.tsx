import {
	Avatar,
	Group,
	HorizontalCell,
	HorizontalScroll,
} from "@vkontakte/vkui";
import React from "react";

interface Props {
	id: number;
}

export const EventMembers: React.FC<Props> = ({}) => {
	const users = [
		{ first_name: "Илья Разимов" },
		{ first_name: "Алина Маликова" },
		{ first_name: "Коля Торис" },
		{ first_name: "Владимир Лосин" },
		{ first_name: "Дарья Базанова" },
		{ first_name: "Виктор Умяров" },
	];
	return (
		<Group>
			<HorizontalScroll>
				<div style={{ display: "flex" }}>
					{users.map((u) => {
						return (
							<HorizontalCell size="s" header={u.first_name}>
								<Avatar
									size={64}
									src={
										"https://yt3.ggpht.com/ytc/AKedOLR0w5kb1tfO1-Y5diasdVxAKVediJ_HrSouiwCnVg=s900-c-k-c0x00ffffff-no-rj"
									}
								/>
							</HorizontalCell>
						);
					})}
				</div>
			</HorizontalScroll>
		</Group>
	);
};
