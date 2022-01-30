import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './AppStack';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

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
