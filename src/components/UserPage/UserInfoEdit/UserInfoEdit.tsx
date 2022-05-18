import React from "react";
import { Button } from "@vkontakte/vkui";
import { CreateUserAboutForm, UserAboutForm } from "../../CreateUserAboutForm";
import { UserData } from "../../../context/userContext";
import { updateUserInfo } from "./api";

interface Prop {
	userData: UserData;
	onClick: () => void;
	onUpdate: () => void;
}

export const UserInfoEdit: React.FC<Prop> = ({
	userData,
	onClick,
	onUpdate,
}) => {
	const handleUpdateUserInfo = async (data: UserAboutForm): Promise<void> => {
		try {
			await updateUserInfo(data);
			onUpdate();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div>
			<CreateUserAboutForm
				userAbout={{
					description: userData.description,
					tags: userData.tags.map((name) => ({
						value: name,
						label: name,
					})),
				}}
				onSubmit={handleUpdateUserInfo}
				buttonText="Сохранить"
				buttonSlot={
					<Button stretched mode="secondary" size="l" onClick={onClick}>
						Отменить
					</Button>
				}
			/>
		</div>
	);
};
