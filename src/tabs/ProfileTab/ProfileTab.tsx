import {View} from "@vkontakte/vkui";
import React from "react";
import {CreateEventPage} from "../../pages/CreateEventPage";

interface Props {
    id: string;
}

export const ProfileTab: React.FC<Props> = ({id}) => {
    return (
        <View activePanel="panel3.1" id={id}>
            <CreateEventPage id="panel3.1" onSubmit={() => {
                    console.log('hi')
                }}
            />
        </View>
    );
}
