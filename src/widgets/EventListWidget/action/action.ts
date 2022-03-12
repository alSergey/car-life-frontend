import {EventData} from "./action.types";
import axios from "axios";

export const apiGetEvents = (): Promise<EventData[]> => {
    return axios.get<EventData[]>('http://localhost:8080/api/v1/events').then((response) => response.data)
}