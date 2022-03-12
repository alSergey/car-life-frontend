export interface EventData {
    id: number
    name: string
    club: number
    description: string
    event_date: string
    location: {
        Latitude: string
        Longitude: string
    }
    photo: string
}