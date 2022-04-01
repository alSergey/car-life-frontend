// eslint-disable-next-line import/named
import { UserInfo } from "@vkontakte/vk-bridge";
import { UserAboutForm } from "../../../components/CreateUserAboutForm";
import { CarForm } from "../../../components/CreateCarForm";

export interface RegForm {
	userForm: UserInfo | null;
	userAboutForm: UserAboutForm | null;
	carForm: CarForm | null;
}
