import {View} from "@vkontakte/vkui";
import React from "react";
import {EventListPage} from "../../pages/EventListPage";

interface Props {
    id: string;
}

export const MainTab: React.FC<Props> = ({id}) => {
 return (
    <View activePanel="panel1.1" id={id}>
        <EventListPage id="panel1.1"/>
    </View>
 );
}
