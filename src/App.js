import React, {Component} from 'react';
import {configure} from 'mobx';
import {Provider, observer} from 'mobx-react';
import rootStore from '@stores';
import Router from './router';

configure({
    enforceActions: 'observed',
});

@observer
class App extends Component {
    render() {
        return (
            <Provider {...rootStore}>
                <Router/>
            </Provider>
        );
    }
}

export default App;
