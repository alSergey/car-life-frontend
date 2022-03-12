import React, {useState} from "react";
import {
    Panel,
    PanelHeader,
    Search,
} from "@vkontakte/vkui";
import {EventListWidget} from "../../widgets/EventListWidget";

import styles from './EventListPage.module.css'

interface Props {
    id: string;
}

export const EventListPage: React.FC<Props> = ({id}) => {
    const [searchText, setSearchText] = useState('')

    return (
        <Panel id={id}>
            <PanelHeader separator={false}>Список событий</PanelHeader>
            <Search
                value={searchText}
                after={null}
                onChange={({target: {value}}) => {
                    setSearchText(value)
                }}
            />
            <div className={styles.eventList}>
                <EventListWidget/>
            </div>
        </Panel>
    )
}
