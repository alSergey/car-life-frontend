import { File } from "@vkontakte/vkui";

export interface EventPostForm {
	text: string;
	files: File[] | null;
}
