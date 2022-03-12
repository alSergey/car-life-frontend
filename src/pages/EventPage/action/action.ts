import {EventData} from "./action.types";
import axios from "axios";

export const apiGetEvent = (id: number): Promise<EventData> => {
    return axios.get<EventData>(`http://localhost:8080/api/v1/events/${id}`).then((response) => response.data)
}