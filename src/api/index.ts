import { Api } from "./Api";
import {backBaseUrl} from "../constants/url";

const api = new Api({
		baseURL: backBaseUrl
});

export { api };
