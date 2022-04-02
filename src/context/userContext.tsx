import React from "react";
import { ModelsUser } from "../api/Api";

export const defaultUser = {
	avatar_url: "",
	description: "",
	name: "",
	surname: "",
	tags: [],
	vkid: 0,
};

interface ContextType {
	userState: ModelsUser;
}

const UserContext = React.createContext<ContextType>({
	userState: defaultUser,
});

export const UserProvider = UserContext.Provider;
export default UserContext;
