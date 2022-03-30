import { CarForm } from "../../../pages/reg/CarPage/api";
import { FavForm } from "../../../pages/reg/FavPage/api";
// eslint-disable-next-line import/named
import { UserInfo } from "@vkontakte/vk-bridge";

export interface RegForm {
	userForm: UserInfo | null;
	favForm: FavForm | null;
	carForm: CarForm | null;
}
