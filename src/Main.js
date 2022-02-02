import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import AppStack from './AppStack';
import { movieReducer } from "./reducers";
import { themeContext } from './context';

const rootReducer = combineReducers({ movieReducer: movieReducer })
const store = createStore(rootReducer, applyMiddleware(thunk));

function Main() {
    const [theme, setTheme] = useState('#2D6176');
    
    useEffect(() => { Platform.OS == 'ios' ? setTheme('#2D6176') : setTheme('#4B9BBB'); }, [])
    
    return (
        <Provider store={store}>
            <themeContext.Provider value={theme}>
                <NavigationContainer>
                    <AppStack />
                </NavigationContainer>
            </themeContext.Provider>
        </Provider>
    );
};

export default Main;
