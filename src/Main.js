import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import AppStack from './AppStack';
import { movieReducer } from "./reducers";

const rootReducer = combineReducers({ movieReducer: movieReducer })

const store = createStore(rootReducer, applyMiddleware(thunk));

function Main() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <AppStack />
            </NavigationContainer>
        </Provider>
    );
};

export default Main;
