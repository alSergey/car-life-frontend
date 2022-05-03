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

export const getPrettyTime = (time: string): string => {
	return new Date(time).toLocaleString("ru", {
		timeStyle: "short",
	});
};

export const convertDateTimeToUTC = (date: string, time: string): string => {
	const newDate = new Date(`${date}T${time}Z`);
	return new Date(
		newDate.getTime() + newDate.getTimezoneOffset() * 60000
	).toISOString();
};

export const convertMiniEventTimeToUTC = (time: string): string => {
	const newTime = time.split(":");
	const newDate = new Date();
	newDate.setHours(Number(newTime[0]), Number(newTime[1]));

	if (newDate.getTime() < new Date().getTime()) {
		newDate.setDate(newDate.getDate() + 1);
	}

	return newDate.toISOString();
};
