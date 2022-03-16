interface EventLocation {
	description: string;
	latitude: number;
	longitude: number;
}

export interface EventForm {
	name: string;
	description: string;
	date: string;
	time: string;
	location: EventLocation;
}
