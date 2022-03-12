import React from "react";
import {ContentCard } from "@vkontakte/vkui";

interface Props {
    title: string;
    date: string;
    time: string;
    img: string;
}

export const EventCard: React.FC<Props> = ({title, date, time, img}) => {
    return (
        <ContentCard
            header={title}
            image={img}
            caption={`${date} ${time}`}
            maxHeight={150}
        />
    )
}
