import React from 'react'
import { ScrollView } from 'react-native'
import Header from '../components/Header';
import MainPoster from '../components/MainPoster';
import CategoriesList from '../components/CategoriesList';

const MainScreen = ({ navigation }) => {
    return (
        <ScrollView style={{height: '100%', backgroundColor: '#2D6176'}}>

            <Header navigation={navigation} />

            <MainPoster navigation={navigation} />

            <CategoriesList navigation={navigation} />

        </ScrollView>
    )
}



export default MainScreen

