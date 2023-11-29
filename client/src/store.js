//import { createStore, appyMiddleware } from 'redux';
//createStore is deprecated so we are using configureStore
import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(...middleware),
    // enhancers: [composeWithDevTools()],
});

export default store;
