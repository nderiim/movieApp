import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import MainMovies from '../components/MainMovies'
import CategoriesList from '../components/CategoriesList'
import { SvgCssUri } from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import getPopularMovies from '../actions';

const MainScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const {popularMovies} = useSelector((state) => state.movieReducer);

    useEffect(() => { 
        dispatch(getPopularMovies())
    }, [])
    
    return (
        <>
            {
                popularMovies.length != 0 ? 
                <SafeAreaView style={{backgroundColor: '#2D6176', height: '100%'}}>
                    
                    <View style={{ borderBottomColor: 'lightgrey', borderBottomWidth: '0.2'}}>
                        <SvgCssUri
                            style={styles.logo} 
                            uri="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"
                        />
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#2D6176'}}>
                        <MainMovies navigation={navigation} movies={popularMovies}/>
                        <CategoriesList navigation={navigation} />
                    </ScrollView>
                    
                </SafeAreaView>
                : <ActivityIndicator size={'large'} color={'lightgrey'} style={{backgroundColor: '#2D6176',flex: 1}}/>
            }
        </>
    )
}

const styles = StyleSheet.create({
    logo:{
        height: 40, 
        margin: 15
    }
})

export default MainScreen

