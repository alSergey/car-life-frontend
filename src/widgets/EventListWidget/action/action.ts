import axios from "axios";
import { EventData } from "./action.types";

export const apiGetEvents = (): Promise<EventData[]> =>
	axios
		.get<EventData[]>("http://localhost:8080/api/v1/events")
		.then((response) => response.data);
