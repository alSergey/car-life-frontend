import React from "react";
import {
	Div,
	Button,
	Panel,
	PanelHeader,
	PanelHeaderBack,
} from "@vkontakte/vkui";
import styles from "./AboutPage.module.css";
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
			<PanelHeader
				left={
					<PanelHeaderBack className={styles.backIcon} onClick={onBackClick} />
				}
			>
				О себе
			</PanelHeader>
			<CreateUserAboutForm
				buttonText="Дальше"
				onSubmit={(userAboutForm) => {
					onFormSubmit(userAboutForm);
					onNextClick();
				}}
			/>
			<Div>
				<Button
					size="l"
					stretched
					mode="secondary"
					onClick={() => onNextClick()}
				>
					Пропустить
				</Button>
			</Div>
		</Panel>
	);
};
