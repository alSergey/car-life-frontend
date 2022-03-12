import React from 'react';
import { View, Panel, PanelHeader, Group, Div } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

const App: React.FC = () => {
	return (
		<View activePanel="mainPanel">
            <Panel id="mainPanel">
                <PanelHeader>Example</PanelHeader>
                <Group>
                    <Div>
                        Hello world
                    </Div>
                </Group>
            </Panel>
        </View>
	);
}

export default App;
