export const deleteEvent = (eventId: number): Promise<number> => {
	console.log("delete event", eventId);
	return Promise.resolve(1);
};

export const complainEvent = (eventId: number): Promise<number> => {
	console.log("complain event", eventId);
	return Promise.resolve(1);
};
