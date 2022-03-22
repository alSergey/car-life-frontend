export interface ClubTags {
	value: string;
	label: string;
}

export interface CreateClubForm {
	name: string;
	description: string;
	tags: ClubTags[];
	file: File | null;
}
