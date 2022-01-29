import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons'; 
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

const BottomTab = createBottomTabNavigator();
function Main() {
    return (
        <NavigationContainer>
            <BottomTab.Navigator>
                <BottomTab.Screen 
                    name="Main" 
                    component={MainStackScreen} 
                    options={{
                        headerShown: false, 
                        tabBarLabel: 'Home',
                        tabBarIcon: () => (
                            <AntDesign name="home" size={30} />
                        )}
                    }
                />
                
                <BottomTab.Screen 
                    name="Search" 
                    component={SearchStackScreen} 
                    options={{
                        headerShown: false, 
                        tabBarIcon: () => (
                            <AntDesign name="search1" size={30} />
                        )}
                    }
                />
            </BottomTab.Navigator>
        </NavigationContainer>
    );
};

export default Main;
