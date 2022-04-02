export const getPrettyYear = (date: string): string => {
	return new Date(date).toLocaleString("ru", { year: "numeric" });
};

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
