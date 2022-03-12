import React from "react";
import {
    Panel,
    PanelHeader,
} from "@vkontakte/vkui";
import {CreateEventWidget} from "../../widgets/CreateEventWidget";

interface Props {
    id: string;
}

export const CreateEventPage: React.FC<Props> = ({id}) => {
    return (
        <Panel id={id}>
            <PanelHeader>Новое событие</PanelHeader>
            <CreateEventWidget onSubmit={() => {
                    console.log('event click')
                }}
            />
        </Panel>
    )
}
