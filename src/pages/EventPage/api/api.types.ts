export interface EventData {
	id: number;
	name: string;
	userStatus: string;
	creator: {
		id: number;
		name: string;
		surname: string;
		avatar: string;
	};
	club: {
		id: number;
		name: string;
		avatar: string;
	};
	description: string;
	event_date: string;
	location: {
		latitude: number;
		longitude: number;
	};
	avatar: string;
	counters: {
		members: number;
		viewers: number;
	};
}
