import {View} from "@vkontakte/vkui";
import React from "react";
import {CreateEventPage} from "../../pages/CreateEventPage";

interface Props {
    id: string;
    onSubmit: () => void;
}

export const ProfileTab: React.FC<Props> = ({id, onSubmit}) => {
    return (
        <View activePanel="panel3.1" id={id}>
            <CreateEventPage id="panel3.1" onSubmit={onSubmit}/>
        </View>
    );
}
