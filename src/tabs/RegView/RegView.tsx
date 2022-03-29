import React, { useEffect, useState } from "react";
import { View } from "@vkontakte/vkui";
import { WelcomePage } from "../../pages/reg/WelcomePage";
import { RegPage } from "../../pages/reg/RegPage";
import { CarPage } from "../../pages/reg/CarPage";
import { emptyRegForm } from "./api";
import { FavPage } from "../../pages/reg/FavPage";
import bridge from "@vkontakte/vk-bridge";
import { regUser } from "./api/api";

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

export const RegView: React.FC<Prop> = ({ id, onSubmit }) => {
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

	const handleReg = async (): Promise<void> => {
		try {
			await regUser(form);
			onSubmit();
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
				onNextClick={handleReg}
			/>
		</View>
	);
};
