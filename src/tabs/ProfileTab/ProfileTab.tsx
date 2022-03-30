import { View } from "@vkontakte/vkui";
import React, { useState } from "react";
import { ProfilePage } from "../../pages/profile/ProfilePage";

interface Props {
	id: string;
}

enum Pages {
	Profile = "profile",
}

export const ProfileTab: React.FC<Props> = ({ id }) => {
	const [activePanel, setActivePanel] = useState(Pages.Profile);

	return (
		<View activePanel={activePanel} id={id}>
			<ProfilePage id={Pages.Profile} />
		</View>
	);
};
