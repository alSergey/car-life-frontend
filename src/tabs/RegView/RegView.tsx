import React, { useEffect, useState } from "react";
import { View } from "@vkontakte/vkui";
import { WelcomePage } from "../../pages/reg/WelcomePage";
import { RegPage } from "../../pages/reg/RegPage";
import { CarPage } from "../../pages/reg/CarPage";
import { emptyRegForm } from "./api";
import { FavPage } from "../../pages/reg/FavPage";
// eslint-disable-next-line import/named
import bridge from "@vkontakte/vk-bridge";

interface Prop {
	id: string;
	onSubmit: () => void;
}

enum Pages {
	Welcome = "welcome",
	Fav = "fav",
	Car = "car",
	Reg = "reg",
}

export const RegView: React.FC<Prop> = ({ id }) => {
	const [activePanel, setActivePanel] = useState(Pages.Welcome);
	const [form, setForm] = useState(emptyRegForm);

	const handleGetUserInfo = async (): Promise<void> => {
		try {
			const userForm = await bridge.send("VKWebAppGetUserInfo");
			setForm({
				...form,
				userForm,
			});
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		handleGetUserInfo();
	}, []);

	return (
		<View activePanel={activePanel} id={id}>
			<WelcomePage
				id={Pages.Welcome}
				onNextClick={() => setActivePanel(Pages.Fav)}
			/>
			<FavPage
				id={Pages.Fav}
				onBackClick={() => setActivePanel(Pages.Welcome)}
				onNextClick={() => setActivePanel(Pages.Car)}
				onFormSubmit={(favForm) => {
					setForm({
						...form,
						favForm,
					});
				}}
			/>
			<CarPage
				id={Pages.Car}
				onBackClick={() => setActivePanel(Pages.Fav)}
				onNextClick={() => setActivePanel(Pages.Reg)}
				onFormSubmit={(carForm) => {
					setForm({
						...form,
						carForm,
					});
				}}
			/>
			<RegPage
				id={Pages.Reg}
				onBackClick={() => setActivePanel(Pages.Car)}
				onNextClick={() => console.log(form)}
			/>
		</View>
	);
};