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
}
