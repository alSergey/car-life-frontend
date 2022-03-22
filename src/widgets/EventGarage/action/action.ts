import axios from "axios";

export const apiGetEventGarage = (): Promise<any> =>
	axios
		.get("http://localhost:8080/api/v1/garage")
		.then((response) => response.data);
