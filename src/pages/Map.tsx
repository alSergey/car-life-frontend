import {CellButton, Group, Panel, PanelHeader, View} from "@vkontakte/vkui";
import React from "react";

interface Props {
    id: string;
}

const Map: React.FC<Props> = (props) => {
    return (
        <View activePanel="panel2.1" id={props.id}>
            <Panel id="panel2.1">
                <PanelHeader>Карта</PanelHeader>
            </Panel>
        </View>
    );
}

export default Map;