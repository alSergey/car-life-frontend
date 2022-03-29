import { CarForm } from "../../../pages/reg/CarPage/api";
import { FavForm } from "../../../pages/reg/FavPage/api";

export interface RegForm {
	favForm: FavForm | null;
	carForm: CarForm | null;
}
