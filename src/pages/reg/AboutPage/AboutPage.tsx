import React from "react";
import { Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";
import {
	CreateUserAboutForm,
	UserAboutForm,
} from "../../../components/CreateUserAboutForm";

interface Props {
	id: string;
	onFormSubmit: (form: UserAboutForm) => void;
	onBackClick: () => void;
	onNextClick: () => void;
}

export const AboutPage: React.FC<Props> = ({
	id,
	onBackClick,
	onNextClick,
	onFormSubmit,
}) => {
	return (
		<Panel id={id}>
			<PanelHeader left={<PanelHeaderBack onClick={onBackClick} />}>
				О себе
			</PanelHeader>
			<CreateUserAboutForm
				buttonText="Дальше"
				onSubmit={(userAboutForm) => {
					onFormSubmit(userAboutForm);
					onNextClick();
				}}
			/>
		</Panel>
	);
};
