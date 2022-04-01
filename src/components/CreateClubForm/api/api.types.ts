import { ClubTags } from "../../../widgets/ClubTagWidget";

export interface ClubForm {
	name: string;
	description: string;
	tags: ClubTags[];
	file: File | null;
}
