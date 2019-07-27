import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux'
import reducers from './redux/reducers'
import Provider from "react-redux/es/components/Provider";
import 'typeface-roboto'
import App from "./App";
import rootSaga from './redux/sagas/root_saga';
import createSagaMiddleware from '@redux-saga/core';
import { composeWithDevTools } from 'redux-devtools-extension';


const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
    reducers,
    {
        snackbar: {
            open: false,
            message: '',
            variant: 'warning',
            vertical: 'top',
            horizontal: 'left',
        }
    },
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
