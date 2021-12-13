import React from 'react'
import { FlatList, ScrollView, StatusBar } from 'react-native'
import Header from '../components/Header';
import MainPoster from '../components/MainPoster';
import CategoriesList from '../components/CategoriesList';
import { movies } from '../movies';
const MainScreen = ({ navigation }) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{height: '100%', backgroundColor: '#2D6176'}}>

            <Header navigation={navigation} />
            
            <MainPoster navigation={navigation} />
            
            <CategoriesList navigation={navigation} />

        </ScrollView>
    )
}



export default MainScreen

