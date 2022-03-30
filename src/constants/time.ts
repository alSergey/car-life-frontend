export const getPrettyDate = (time: string): string => {
	return new Date(time).toLocaleString("ru", {
		dateStyle: "short",
	});
};

export const getPrettyDateTime = (time: string): string => {
	return new Date(time).toLocaleString("ru", {
		dateStyle: "medium",
		timeStyle: "short",
	});
};
