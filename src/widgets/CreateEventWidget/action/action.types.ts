interface EventLocation {
    description: string;
    latitude: string;
    longitude: string;
}

export interface EventForm {
    name: string;
    description: string;
    date: string;
    time: string;
    location: EventLocation;
}
