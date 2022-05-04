export interface ClubData {
	id: number;
	name: string;
	description: string;
	tags: string[];
	avatar: string;
	userStatus: string;
	counters: {
		members: number;
		subscribers: number;
	};
}
