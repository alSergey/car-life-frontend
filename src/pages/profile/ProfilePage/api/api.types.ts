export interface GarageData {
	id: number;
	brand: string;
	model: string;
	date: string;
	description: string;
	photo: string;
}

export interface InfoData {
	tags: string[];
	description: string;
}

export interface UserData {
	id: number;
	name: string;
	surname: string;
	avatar: string;
	info: InfoData | null;
	garageList: GarageData[];
}
