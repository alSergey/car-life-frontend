import React from "react";
import {
    CardGrid
} from "@vkontakte/vkui";
import {EventCard} from "../../components/EventCard";

export const EventListWidget: React.FC = () => {
    return (
        <CardGrid size="l">
            <EventCard
                title="Новое"
                date="22.11.2021"
                time="11:12"
                img="https://pbs.twimg.com/profile_images/1173161429266030592/lJCNA_JC_400x400.jpg"
            />
            <EventCard
                title="Новое"
                date="22.11.2021"
                time="11:12"
                img="https://pbs.twimg.com/profile_images/1173161429266030592/lJCNA_JC_400x400.jpg"
            />
            <EventCard
                title="Новое"
                date="22.11.2021"
                time="11:12"
                img="https://pbs.twimg.com/profile_images/1173161429266030592/lJCNA_JC_400x400.jpg"
            />
        </CardGrid>
    )
}
