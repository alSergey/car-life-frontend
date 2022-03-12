import React, {useState} from 'react';
import {
    AppRoot,
    Epic,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Clubs from "./pages/Clubs";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar/NavBar";
import {ID_CLUBS, ID_MAP, ID_PROFILE} from "./constants/config";
import Event from "./pages/Event";

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
                    {/*<Event id={ID_CLUBS}*/}
                    {/*   imageUrl={"https://a.d-cd.net/PQAAAgANmOA-1920.jpg"}*/}
                    {/*   title={"Meeting meeting"}*/}
                    {/*   date={"21.03.2022"}*/}
                    {/*   time={"15:00"}*/}
                    {/*   address={"Moscow, Yugnaya st, 4"}*/}
                    {/*   description={"Date object\n" +*/}
                    {/*       "dateObject\n" +*/}
                    {/*       "An existing Date object. This effectively makes a copy of the existing Date object with the " +*/}
                    {/*       "same date and time. This is equivalent to using the new Date(value) constructor, where " +*/}
                    {/*       "value can be obtained using the valueOf() method.\n" +*/}
                    {/*       "\n" +*/}
                    {/*       "Individual date and time component values Given at least a year and month, this form of" +*/}
                    {/*       "Date() returns a Date object whose component values (year, month, day, hour, minute, second, and millisecond) all " +*/}
                    {/*       "come from the following parameters. Any missing fields are given the lowest possible value (1 for day and 0 for every other component). " +*/}
                    {/*       "The parameter values are all evaluated against the local time zone, rather than UTC.\n"}*/}
                    {/*/>*/}
                    <Map id={ID_MAP}/>
                    <Profile id={ID_PROFILE}/>
            </Epic>
        </AppRoot>
	);
}

export default App;
