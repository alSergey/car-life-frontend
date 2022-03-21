interface EventLocation {
	description: string;
	latitude: number;
	longitude: number;
}

export interface CreateEventForm {
	name: string;
	description: string;
	date: string;
	time: string;
	file: File | null;
	location: EventLocation;
}
