import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen'
import SearchScreen from './screens/SearchScreen'

const Stack = createNativeStackNavigator();

function Main() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Main" component={MainScreen} options={{headerShown: false}}/>
                <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Search" component={SearchScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default Main;
