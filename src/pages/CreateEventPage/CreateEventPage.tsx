import React from "react";
import {
    Panel,
    PanelHeader,
} from "@vkontakte/vkui";
import {CreateEventWidget} from "../../widgets/CreateEventWidget";

interface Props {
    id: string;
    onSubmit: () => void
}

export const CreateEventPage: React.FC<Props> = ({id, onSubmit}) => {
    return (
        <Panel id={id}>
            <PanelHeader>Новое событие</PanelHeader>
            <CreateEventWidget onSubmit={onSubmit}/>
        </Panel>
    )
}
