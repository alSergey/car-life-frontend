import React, { useEffect, useState } from "react";
import { View } from "@vkontakte/vkui";
import { WelcomePage } from "../../pages/reg/WelcomePage";
import { RegPage } from "../../pages/reg/RegPage";
import { CarPage } from "../../pages/reg/CarPage";
import { AboutPage } from "../../pages/reg/AboutPage";
import { FirstStory } from "../../pages/reg/FirstStory";
import { SecondStory } from "../../pages/reg/SecondStory";
import { ThirdStory } from "../../pages/reg/ThirdStory";
import { emptyRegForm, regUser } from "./api";
import bridge from "@vkontakte/vk-bridge";
import { useLocation, useRouter } from "@happysanta/router";
import {
	REG_WELCOME_PANEL,
	REG_FIRST_STORY_PAGE,
	REG_FIRST_STORY_PANEL,
	REG_SECOND_STORY_PAGE,
	REG_SECOND_STORY_PANEL,
	REG_THIRD_STORY_PAGE,
	REG_THIRD_STORY_PANEL,
	REG_ABOUT_PAGE,
	REG_ABOUT_PANEL,
	REG_CAR_PAGE,
	REG_CAR_PANEL,
	REG_PAGE,
	REG_PANEL,
} from "../../router";

interface Prop {
	id: string;
	onSubmit: () => void;
}

export const RegView: React.FC<Prop> = ({ id, onSubmit }) => {
	const location = useLocation();
	const router = useRouter();

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
		<View
			id={id}
			history={location.getViewHistory(id)}
			onSwipeBack={() => router.popPage()}
			// @ts-ignore
			activePanel={location.getViewActivePanel(id)}
		>
			<WelcomePage
				id={REG_WELCOME_PANEL}
				onNextClick={() => router.pushPage(REG_FIRST_STORY_PAGE)}
			/>
			<FirstStory
				id={REG_FIRST_STORY_PANEL}
				onBackClick={() => router.popPage()}
				onNextClick={() => router.pushPage(REG_SECOND_STORY_PAGE)}
			/>
			<SecondStory
				id={REG_SECOND_STORY_PANEL}
				onBackClick={() => router.popPage()}
				onNextClick={() => router.pushPage(REG_THIRD_STORY_PAGE)}
			/>
			<ThirdStory
				id={REG_THIRD_STORY_PANEL}
				onBackClick={() => router.popPage()}
				onNextClick={() => router.pushPage(REG_ABOUT_PAGE)}
				onSkipClick={() => router.pushPage(REG_PAGE)}
			/>
			<AboutPage
				id={REG_ABOUT_PANEL}
				onBackClick={() => router.popPage()}
				onNextClick={() => router.pushPage(REG_CAR_PAGE)}
				onFormSubmit={(userAboutForm) => {
					setForm({
						...form,
						userAboutForm,
					});
				}}
			/>
			<CarPage
				id={REG_CAR_PANEL}
				onBackClick={() => router.popPage()}
				onNextClick={() => router.pushPage(REG_PAGE)}
				onFormSubmit={(carForm) => {
					setForm({
						...form,
						carForm,
					});
				}}
			/>
			<RegPage
				id={REG_PANEL}
				onBackClick={() => router.popPage()}
				onNextClick={handleReg}
			/>
		</View>
	);
};
