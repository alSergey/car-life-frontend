import { ClubTags } from "../../../widgets/TagWidget/api";
import { CarForm } from "../../../pages/reg/CarPage/api";

export interface RegForm {
	tags: ClubTags[];
	car: CarForm | null;
}
