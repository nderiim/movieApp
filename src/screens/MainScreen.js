import React from 'react'
import { ScrollView, SafeAreaView } from 'react-native'
import Header from '../components/Header';
import MainPoster from '../components/MainPoster';
import CategoriesList from '../components/CategoriesList';

const MainScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{backgroundColor: '#2D6176', height: '100%'}}>
            <Header navigation={navigation} />

            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#2D6176'}}>
                <MainPoster navigation={navigation} />
                <CategoriesList navigation={navigation} />
            </ScrollView>

        </SafeAreaView>
    )
}

MainScreen.navigationOptions = () => { return { headerShown: false } }

export default MainScreen

