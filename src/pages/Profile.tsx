import {CellButton, Group, Panel, PanelHeader, View} from "@vkontakte/vkui";
import React from "react";

interface Props {
    id: string;
}

const Profile: React.FC<Props> = (props) => {
    return (
        <View activePanel="panel3.1" id={props.id}>
            <Panel id="panel3.1">
                <PanelHeader>Профиль</PanelHeader>
            </Panel>
        </View>
    );
}

export default Profile;