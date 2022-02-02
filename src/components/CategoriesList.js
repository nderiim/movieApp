import React, { useEffect } from 'react'
import { View } from 'react-native'
import CategorieCard from './CategorieCard';
import { getUpcomingMovies, getMoviesByReleaseYear, getPopularTvShows } from '../actions'
import { useDispatch, useSelector } from 'react-redux';

const currentYear = new Date().getFullYear()

const CategoriesList = ({navigation}) => {
    const dispatch = useDispatch()
    const { upcomingMovies } = useSelector((state) => state.movieReducer)
    const { moviesByReleaseYear } = useSelector((state) => state.movieReducer)
    const { popularTvShows } = useSelector((state) => state.movieReducer)

    useEffect(() => { 
        dispatch(getUpcomingMovies()) 
        dispatch(getMoviesByReleaseYear()) 
        dispatch(getPopularTvShows()) 
    }, [])

    return (
        <View>
            <CategorieCard navigation={ navigation } movies={ upcomingMovies } categoryName={'Upcoming Movies'}/>

            <CategorieCard navigation={ navigation } movies={ moviesByReleaseYear } categoryName={`${currentYear} movie releases`}/>

            <CategorieCard navigation={ navigation } movies={ popularTvShows } categoryName={'Popular Tv Shows'}/>
        </View>
    )
}



export default CategoriesList











