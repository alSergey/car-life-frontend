import { api } from "../../../api";

export const getEventList = () => {
	return api.events.eventsList().then(({ data }) => data);
};
