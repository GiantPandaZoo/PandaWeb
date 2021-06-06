 import React from 'react';
import {render} from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {ErrorBoundary} from '@/components';
import ApplicationConfig from 'ApplicationConfig';
import moment from 'moment';
import intl from 'react-intl-universal';
import './index.scss';

import App from './App';

moment.locale('zh-cn');

const locales = {
    'en': require('./locales/en_US.json'),
    'zh': require('./locales/zh_CN.json'),
};
// let lang = (navigator.languages && navigator.languages[0]) || navigator.language;
// let lang = 'zh-CN';
let lang = ApplicationConfig.lang;
intl.init({
    currentLocale: lang.split('-')[0],
    locales: locales,
});

const CONTAINER = document.getElementById('root');

if (!CONTAINER) {
    throw new Error(' <div id="root"></div> Node is not found.');
}

render(
    <ErrorBoundary>
        <App/>
    </ErrorBoundary>,
    CONTAINER
);

if (process.env.REACT_APP_HMR === 'true' && module.hot) {
    module.hot.accept();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
