export interface ClubData {
	id: number;
	name: string;
	description: string;
	tags: string[];
	avatar: string;
	owner: {
		id: number;
		name: string;
		surname: string;
		avatar: string;
	};
	userStatus: string;
	counters: {
		members: number;
		subscribers: number;
	};
}
