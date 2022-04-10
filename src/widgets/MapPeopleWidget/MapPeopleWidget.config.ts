import { websiteUrl } from "../../constants/url";

export const PlacemarkImage = {
	help: {
		iconLayout: "default#image",
		iconImageHref: `${websiteUrl}/img/mini-events/sos.png`,
		iconImageSize: [90, 100],
		iconImageOffset: [-45, -50],
	},
	meeting: {
		iconLayout: "default#image",
		iconImageHref: `${websiteUrl}/img/mini-events/meetup.png`,
		iconImageSize: [28, 28],
		iconImageOffset: [-14, -14],
	},
	danger: {
		iconLayout: "default#image",
		iconImageHref: `${websiteUrl}/img/mini-events/warning.png`,
		iconImageSize: [25, 30],
		iconImageOffset: [-12, -15],
	},
	default: {
		preset: "islands#oliveDotIcon",
	},
};

export const EventsTypes = [
	{
		value: 1,
		label: "Нужна помощь",
	},
	{
		value: 2,
		label: "Мини-сходка",
	},
	{
		value: 3,
		label: "Опасность",
	},
];
