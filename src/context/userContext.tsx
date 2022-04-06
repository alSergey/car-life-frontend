import React from "react";
import { api } from "../api";
import { noop } from "@vkontakte/vkjs";

export const getUserData = async (): Promise<UserData> =>
	api.me.getMe().then(({ data }) => ({
		id: data.vkid,
		name: data.name,
		surname: data.surname,
		avatar: data.avatar_url,
		tags: data.tags,
		description: data.description,
	}));

export interface UserData {
	id: number;
	name: string;
	surname: string;
	avatar: string;
	tags: string[];
	description: string;
}

export const defaultUserData: UserData = {
	id: 0,
	name: "",
	surname: "",
	avatar: "",
	description: "",
	tags: [],
};

interface ContextType {
	isLoggedIn: null | boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
	userState: UserData;
	refreshUserState: () => void;
}

export const UserContext = React.createContext<ContextType>({
	isLoggedIn: null,
	setIsLoggedIn: noop,
	userState: defaultUserData,
	refreshUserState: noop,
});

export const UserProvider = UserContext.Provider;
