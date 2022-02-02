import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { themeContext } from './context';
import MainScreen from './screens/MainScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen'
import SearchScreen from './screens/SearchScreen'

const MainStack = createNativeStackNavigator();
function MainStackScreen() {
    return(
        <MainStack.Navigator>
            <MainStack.Screen name="Main" component={MainScreen} options={{headerShown: false}}/>
            <MainStack.Screen name="MovieDetails" component={MovieDetailsScreen} options={{headerShown: false}}/>
        </MainStack.Navigator>
    )
};

const SearchStack = createNativeStackNavigator();
function SearchStackScreen() {
    return(
        <SearchStack.Navigator>
            <SearchStack.Screen name="Search" component={SearchScreen} options={{headerShown: false}}/>
            <SearchStack.Screen name="MovieDetails" component={MovieDetailsScreen} options={{headerShown: false}}/>
        </SearchStack.Navigator>
    )
};

const BottomTab = createMaterialBottomTabNavigator();
function AppStack() {
    const theme = useContext(themeContext);
    return (
        <BottomTab.Navigator 
            barStyle={{ backgroundColor: theme }}
            shifting={true}
        >
            <BottomTab.Screen 
                name="MainTab" 
                component={MainStackScreen} 
                options={{
                    headerShown: false, 
                    tabBarLabel: 'Home',
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="home" size={26} />
                    )}
                }
            />
            
            <BottomTab.Screen 
                name="SearchTab" 
                component={SearchStackScreen} 
                options={{
                    headerShown: false, 
                    tabBarLabel: 'Search',
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="movie-search-outline" size={26} />
                    )}
                }
            />
        </BottomTab.Navigator>
    );
};

export default AppStack;
