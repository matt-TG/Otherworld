import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import enemiesReducer from './store/reducers/enemies';
import locationReducer from './store/reducers/location';
import playerReducer from './store/reducers/player';
import hideReducer from './store/reducers/hide';
import authReducer from './store/reducers/auth';
import fetchReducer from './store/reducers/fetch';
import saveReducer from './store/reducers/save';
import hscReducer from './store/reducers/high';

import {BrowserRouter} from 'react-router-dom';

import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

const rootReducer=combineReducers({
    
    enemies: enemiesReducer,
    location: locationReducer,
    player: playerReducer,
    hide: hideReducer,
    auth: authReducer,
    fetch: fetchReducer,
    save: saveReducer,
    hsc: hscReducer

    
})

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store= createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));
registerServiceWorker();
