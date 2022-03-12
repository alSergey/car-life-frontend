import React, {useState} from 'react';
import {
    AppRoot,
    Epic,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {MainTab} from "./tabs/MainTab";
import {MapTab} from "./tabs/MapTab";
import {ProfileTab} from "./tabs/ProfileTab";
import {NavBar} from "./components/NavBar";
import {ID_MAIN, ID_MAP, ID_PROFILE} from "./constants/config";
import Event from "./pages/Event";

const App: React.FC = () => {
    const [activeView, setActiveView] = useState(ID_MAIN);

	return (
        <AppRoot>
            <Epic activeStory={activeView} tabbar={
                <NavBar
                    activeStory={activeView}
                    onClubsClick={() => setActiveView(ID_MAIN)}
                    onMapClick={() => setActiveView(ID_MAP)}
                    onProfileClick={() => setActiveView(ID_PROFILE)}
                />
                }>
                    <MainTab id={ID_MAIN}/>
                    <MapTab id={ID_MAP}/>
                    <ProfileTab id={ID_PROFILE}/>
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
            </Epic>
        </AppRoot>
	);
}

export default App;
