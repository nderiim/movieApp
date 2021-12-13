import React from 'react'
import { View } from 'react-native'
import CategorieCard from './CategorieCard';
import { movies } from '../movies';

const CategoriesList = ({navigation}) => {
    return (
        <View style={{marginBottom: 30}}>
            <CategorieCard navigation={navigation} movies={ movies } categoryName={'Category Name'}/>

            <CategorieCard navigation={navigation} movies={ movies } categoryName={'Category Name'}/>

            <CategorieCard navigation={navigation} movies={ movies } categoryName={'Category Name'}/>
        </View>
    )
}



export default CategoriesList











