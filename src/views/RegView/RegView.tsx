import React, { useContext, useEffect, useState } from "react";
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
import { UserContext } from "../../context/userContext";
import { setToken } from "../../api";
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
	MAP_PAGE,
} from "../../router";

interface Prop {
	id: string;
}

export const RegView: React.FC<Prop> = ({ id }) => {
	const location = useLocation();
	const router = useRouter();

	const { refreshUserState, isLoggedIn, setIsLoggedIn } =
		useContext(UserContext);

	const [formData, setFormData] = useState(emptyRegForm);
	const [loading, setLoading] = useState(false);

	const handleGetUserInfo = async (): Promise<void> => {
		try {
			const userForm = await bridge.send("VKWebAppGetUserInfo");
			setFormData((oldForm) => ({
				...oldForm,
				userForm,
			}));
		} catch (err) {
			console.error(err);
		}
	};

	const handleReg = async (): Promise<void> => {
		setLoading(true);
		try {
			const session = await regUser(formData);
			setToken(session);
			setIsLoggedIn(true);
			refreshUserState();
			router.pushPage(MAP_PAGE);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (isLoggedIn === true) return router.pushPage(MAP_PAGE);

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
					setFormData((oldForm) => ({
						...oldForm,
						userAboutForm,
					}));
				}}
			/>
			<CarPage
				id={REG_CAR_PANEL}
				onBackClick={() => router.popPage()}
				onNextClick={() => router.pushPage(REG_PAGE)}
				onFormSubmit={(carForm) => {
					setFormData((oldForm) => ({
						...oldForm,
						carForm,
					}));
				}}
			/>
			<RegPage
				id={REG_PANEL}
				loading={loading}
				onBackClick={() => router.popPage()}
				onNextClick={handleReg}
			/>
		</View>
	);
};
