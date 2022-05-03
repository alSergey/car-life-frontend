import { ModelsMiniEvent } from "../../../api/Api";
import { api } from "../../../api";

export const getMiniEventList = (): Promise<ModelsMiniEvent[]> =>
	api.miniEvents.miniEventsList().then(({ data }) => data);
