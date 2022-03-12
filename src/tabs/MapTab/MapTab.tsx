import {Panel, PanelHeader, View} from "@vkontakte/vkui";
import React from "react";

interface Props {
    id: string;
}

export const MapTab: React.FC<Props> = ({id}) => {
    return (
        <View activePanel="panel2.1" id={id}>
            <Panel id="panel2.1">
                <PanelHeader>Карта</PanelHeader>
            </Panel>
        </View>
    );
}
