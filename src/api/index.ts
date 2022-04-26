import { Api } from "./Api";
import { backBaseUrl } from "../constants/url";

let token = "";

const setToken = (value: string): void => {
	token = value;
};

const getToken = (): string => {
	return token;
};

const api = new Api({
	baseURL: backBaseUrl,
});

api.instance.interceptors.request.use((config) => {
	if (!config.headers) return config;

	config.headers.auth = token;
	return config;
});

export { setToken, getToken, api };
