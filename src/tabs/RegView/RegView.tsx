import React, { useEffect, useState } from "react";
import { View } from "@vkontakte/vkui";
import { WelcomePage } from "../../pages/reg/WelcomePage";
import { RegPage } from "../../pages/reg/RegPage";
import { CarPage } from "../../pages/reg/CarPage";
import { AboutPage } from "../../pages/reg/AboutPage";
import { emptyRegForm, regUser } from "./api";
import bridge from "@vkontakte/vk-bridge";
import { FirstStory } from "../../pages/reg/FirstStory";
import { SecondStory } from "../../pages/reg/SecondStory";
import { ThirdStory } from "../../pages/reg/ThirdStory";

interface Prop {
	id: string;
	onSubmit: () => void;
}

enum Pages {
	Welcome = "welcome",
	First = "first",
	Second = "second",
	Third = "third",
	Fav = "fav",
	Car = "car",
	Reg = "reg",
}

export const RegView: React.FC<Prop> = ({ id, onSubmit }) => {
	const [activePanel, setActivePanel] = useState(Pages.Welcome);
	const [form, setForm] = useState(emptyRegForm);
	const [beforePanel, setBeforePanel] = useState(Pages.Third);

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
				onNextClick={() => setActivePanel(Pages.First)}
			/>
			<FirstStory
				id={Pages.First}
				onNextClick={() => setActivePanel(Pages.Second)}
				onBackClick={() => setActivePanel(Pages.Welcome)}
			/>
			<SecondStory
				id={Pages.Second}
				onNextClick={() => setActivePanel(Pages.Third)}
				onBackClick={() => setActivePanel(Pages.First)}
			/>
			<ThirdStory
				id={Pages.Third}
				onNextClick={() => {
					setActivePanel(Pages.Fav);
					setBeforePanel(Pages.Car);
				}}
				onBackClick={() => setActivePanel(Pages.Second)}
				onSkipClick={() => {
					setActivePanel(Pages.Reg);
					setBeforePanel(Pages.Third);
				}}
			/>
			<AboutPage
				id={Pages.Fav}
				onBackClick={() => setActivePanel(Pages.Third)}
				onNextClick={() => setActivePanel(Pages.Car)}
				onFormSubmit={(favForm) => {
					setForm({
						...form,
						userAboutForm: favForm,
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
				onBackClick={() => setActivePanel(beforePanel)}
				onNextClick={handleReg}
			/>
		</View>
	);
};
