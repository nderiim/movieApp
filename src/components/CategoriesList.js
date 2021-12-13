import React from 'react'
import { View } from 'react-native'
import CategorieCard from './CategorieCard';
import { movies } from '../movies';

const CategoriesList = () => {
    return (
        <View style={{marginBottom: 30}}>
            <CategorieCard movies={ movies } categoryName={'Category Name'}/>

            <CategorieCard movies={ movies } categoryName={'Category Name'}/>

            <CategorieCard movies={ movies } categoryName={'Category Name'}/>
        </View>
    )
}



export default CategoriesList











