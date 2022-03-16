import axios from "axios";
import { EventData } from "./action.types";

export const apiGetEvent = (id: number): Promise<EventData> =>
	axios
		.get<EventData>(`http://localhost:8080/api/v1/events/${id}`)
		.then((response) => response.data);
