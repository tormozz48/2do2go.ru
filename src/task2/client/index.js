import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './components/store';
import App from './components/app';

const rootEl = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    rootEl
);