import React, {useEffect, useState} from "react";
import {CardGrid, Footer} from "@vkontakte/vkui";
import {EventCard} from "../../components/EventCard";
import {apiGetEvents} from "./action";
import {EventData} from "./action/action.types";

interface Props {
    searchText: string;
    onClick: (id: number) => void;
}

const defaultEventList: EventData[] = []

export const EventListWidget: React.FC<Props> = ({searchText, onClick}) => {
    const [eventList, setEventList] = useState(defaultEventList)
    const [filteredEventList, setFilteredEventList] = useState(defaultEventList)

    useEffect(() => {
        getEvents()
    }, [])

    useEffect(() => {
        filterEvents()
    }, [searchText])

    const filterEvents = (): void => {
        const data = eventList.filter(({name}) => name.includes(searchText))
        setFilteredEventList(data)
    }

    const getEvents = async (): Promise<void> => {
        try {
            const data = await apiGetEvents()
            console.log(data)
            setEventList(data)
            setFilteredEventList(data)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <CardGrid size="l">
                {
                    filteredEventList.map(({id, name, event_date, photo}) => (
                        <EventCard
                            key={id}
                            title={name}
                            date={event_date}
                            img={photo}
                            onClick={() => onClick(id)}
                        />
                    ))
                }
            </CardGrid>
            {
                filteredEventList.length === 0 && (
                    <Footer>Ничего не найдено</Footer>
                )
            }
        </div>
    )
}
