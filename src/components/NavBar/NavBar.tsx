import React, {useState} from "react";
import {Tabbar, TabbarItem} from "@vkontakte/vkui";
import {Icon28LocationMapOutline, Icon28NewsfeedOutline, Icon28UserCircleOutline} from "@vkontakte/icons";
import {ID_CLUBS, ID_MAP, ID_PROFILE} from "../../constants/config";
import exp from "constants";

interface Props {
    activeStory: string;
    onClubsClick: () => void;
    onMapClick: () => void;
    onProfileClick: () => void;
}

const NavBar: React.FC<Props> = (props) => {
    const {activeStory, onClubsClick, onMapClick, onProfileClick} = props;
    return (
            <Tabbar>
                <TabbarItem
                    selected={activeStory === ID_CLUBS}
                    data-story={ID_CLUBS}
                    onClick={onClubsClick}
                    text="Клубы"
                >
                    <Icon28NewsfeedOutline/>
                </TabbarItem>
                <TabbarItem
                    selected={activeStory === ID_MAP}
                    data-story={ID_MAP}
                    onClick={onMapClick}
                    text="Карта"
                >
                    <Icon28LocationMapOutline/>
                </TabbarItem>
                <TabbarItem
                    selected={activeStory === ID_PROFILE}
                    data-story={ID_PROFILE}
                    onClick={onProfileClick}
                    text="Профиль"
                >
                    <Icon28UserCircleOutline/>
                </TabbarItem>
            </Tabbar>
    );
}

export default NavBar;