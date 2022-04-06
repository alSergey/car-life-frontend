import { ModelsMiniEvent } from "../../../api/Api";

export const emptyEventList: ModelsMiniEvent[] = [
	{
		id: 1,
		type: {
			id: 2,
			public_name: "происшествие",
			public_description: "добавьте происшествие",
		},
		user: {
			avatar_url: "string",
			name: "Петя",
			surname: "Пупкин",
			vkid: 1,
		},
		description: "кажется здесь дтп",
		created_at: "2022-04-14T10:00:00Z",
		ended_at: "2022-04-14T20:50:00Z",
		latitude: 57.333333,
		longitude: 36.444444,
	},
];
