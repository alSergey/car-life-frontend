import React from 'react';
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
    useAdaptivity, ViewWidth
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

const App: React.FC = () => {
    const { viewWidth } = useAdaptivity();

	return (
        <AppRoot>
            <SplitLayout header={<PanelHeader separator={false} />}>
                <SplitCol spaced={viewWidth && viewWidth > ViewWidth.MOBILE}>
                    <View activePanel="main">
                        <Panel id="main">
                            <PanelHeader>CarLife</PanelHeader>
                            <Group header={<Header mode="secondary">Items</Header>}>
                                <SimpleCell>Hello</SimpleCell>
                                <SimpleCell>World</SimpleCell>
                            </Group>
                        </Panel>
                    </View>
                </SplitCol>
            </SplitLayout>
        </AppRoot>
	);
}

export default App;
