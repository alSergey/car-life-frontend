import React, {useState} from 'react';
import {
    AppRoot,
    SplitLayout,
    PanelHeader,
    SplitCol,
    View,
    Panel,
    Group,
    Header,
    SimpleCell,
    useAdaptivity, ViewWidth, Root, Epic, Placeholder, PanelHeaderBack
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Clubs from "./pages/Clubs";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar/NavBar";
import {ID_CLUBS, ID_MAP, ID_PROFILE} from "./constants/config";
import {Icon28ServicesOutline, Icon56NewsfeedOutline} from "@vkontakte/icons";

const App: React.FC = () => {
    const [activeView, setActiveView] = useState(ID_CLUBS);

    const clubsClick = () => {
       setActiveView(ID_CLUBS);
    }
    const mapClick = () => {
        setActiveView(ID_MAP);
    }

    const profileClick = () => {
        setActiveView(ID_PROFILE);

    }

	return (
        <AppRoot>
            <Epic activeStory={activeView} tabbar={
                <NavBar
                    activeStory={activeView}
                    onClubsClick={clubsClick}
                    onMapClick={mapClick}
                    onProfileClick={profileClick}
                />
                }>
                    <Clubs id={ID_CLUBS}/>
                    <Map id={ID_MAP}/>
                    <Profile id={ID_PROFILE}/>
            </Epic>
            {/*<Root activeView={activeView}>*/}
            {/*    <Clubs id={ID_CLUBS}/>*/}
            {/*    <Map id={ID_MAP}/>*/}
            {/*    <Profile id={ID_PROFILE}/>*/}
            {/*</Root>*/}
            {/*<NavBar*/}
            {/*    activeStory={activeView}*/}
            {/*    onClubsClick={clubsClick}*/}
            {/*    onMapClick={mapClick}*/}
            {/*    onProfileClick={profileClick}*/}
            {/*/>*/}
        </AppRoot>
	);
}

export default App;
