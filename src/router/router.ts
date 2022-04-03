import { Router } from "@happysanta/router";
import { MAIN_ROUTES } from "./main";
import { MAP_ROUTES } from "./map";
import { PROFILE_ROUTES } from "./profile";
import { REG_ROUTES } from "./reg";

const routes = {
	// Роуты главная
	...MAIN_ROUTES,

	// Роуты карта
	...MAP_ROUTES,

	// Роуты профиль
	...PROFILE_ROUTES,

	// Роуты регистрация
	...REG_ROUTES,
};

export const router = new Router(routes);

router.start();
