export interface CarData {
	id: number;
	brand: string;
	model: string;
	body?: string;
	engine?: string;
	date: string;
	horse_power?: string;
	name?: string;
	description?: string;
	avatar_url: string;
	owner: {
		avatar_url?: string;
		name: string;
		surname: string;
		id: number;
	};
}
