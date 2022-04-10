import { OwnerClub } from "../../../widgets/OwnerClubWidget/api";

export interface EventLocation {
	latitude: number;
	longitude: number;
}

export interface EventForm {
	name: string;
	description: string;
	club: OwnerClub | null;
	date: string;
	time: string;
	file: File | null;
	location: EventLocation | null;
}
