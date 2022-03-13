import React from "react";
import {ContentCard } from "@vkontakte/vkui";

interface Props {
    title: string;
    date: string;
    img: string;
    onClick: () => void;
}

export const EventCard: React.FC<Props> = ({title, date, img, onClick}) => {
    return (
        <ContentCard
            header={title}
            image={img}
            caption={new Date(date).toLocaleString()}
            maxHeight={150}
            onClick={onClick}
        />
    )
}
