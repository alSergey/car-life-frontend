import {CellButton, Group, Panel, PanelHeader, View} from "@vkontakte/vkui";
import React from "react";

interface Props {
    id: string;
}

const Clubs: React.FC<Props> = (props) => {
 return (
    <View activePanel="panel1.1" id={props.id}>
        <Panel id="panel1.1">
            <PanelHeader>Клубы</PanelHeader>
        </Panel>
    </View>
 );
}

export default Clubs;