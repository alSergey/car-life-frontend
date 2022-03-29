import React, { useState } from "react";
import { View } from "@vkontakte/vkui";
import { WelcomePage } from "../../pages/reg/WelcomePage";
import { RegPage } from "../../pages/reg/RegPage";
import { CarPage } from "../../pages/reg/CarPage";
import { emptyRegForm } from "./api";

interface Prop {
	id: string;
}

enum Pages {
	Welcome = "welcome",
	Reg = "reg",
	Car = "car",
}

export const RegView: React.FC<Prop> = ({ id }) => {
	const [activePanel, setActivePanel] = useState(Pages.Welcome);
	const [form, setForm] = useState(emptyRegForm);

	return (
		<View activePanel={activePanel} id={id}>
			<WelcomePage
				id={Pages.Welcome}
				onNextClick={() => setActivePanel(Pages.Reg)}
			/>
			<RegPage
				id={Pages.Reg}
				form={form}
				onFormChange={setForm}
				onCarClick={() => setActivePanel(Pages.Car)}
			/>
			<CarPage
				id={Pages.Car}
				form={form}
				onFormChange={setForm}
				onBackClick={() => setActivePanel(Pages.Reg)}
			/>
		</View>
	);
};
