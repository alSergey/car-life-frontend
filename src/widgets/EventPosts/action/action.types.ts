// TODO
export interface EventPostsData {
	id: number;
	name: string;
	club: number;
	description: string;
	event_date: string;
	location: {
		latitude: number;
		longitude: number;
	};
	avatar: string;
}
