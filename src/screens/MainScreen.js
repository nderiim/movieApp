import React, { useEffect, useState } from 'react'
import { ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import Header from '../components/Header'
import MainMovies from '../components/MainMovies'
import CategoriesList from '../components/CategoriesList'
import axios from "axios"

const instanceTMDB = axios.create({ method: 'GET', baseURL: 'https://api.themoviedb.org/3', params: { 'api_key': '1f8884e4f7e6ecb71748ffc3b577ee9f'} })

const MainScreen = ({ navigation }) => {
    const [movies, setMovies] = useState([])

    const fetchMovies = async () => {
        //#region 
        const response = await instanceTMDB.get('/discover/movie?sort_by=popularity.desc');
        let genres = await instanceTMDB.get('/genre/movie/list');
        let fetchedMovies = []
        for (let i = 0; i < 5; i++) {
            fetchedMovies[i] = response.data.results[i]
            fetchedMovies[i].image = 'https://image.tmdb.org/t/p/w500' + response.data.results[i].poster_path
            fetchedMovies[i].genre = ''
            for (let j = 0; j < genres.data.genres.length; j++) {
                for (let z = 0; z < genres.data.genres.length; z++) {
                    if (fetchedMovies[i].genre_ids[j] == genres.data.genres[z].id) {
                        fetchedMovies[i].genre += genres.data.genres[z].name + (j != fetchedMovies[i].genre_ids.length - 1 ? ', ' : '')
                    }
                }
            }
        }
        
        for (let i = 0; i < fetchedMovies.length; i++) {
            try {
                var trailer = await instanceTMDB.get(`/movie/${fetchedMovies[i].id}/videos`)
                for (let j = 0; j < trailer.data.results.length; j++) {
                    if (trailer.data.results[j].type == "Trailer") {
                        fetchedMovies[i].video = trailer.data.results[j].key
                        break
                    }
                }
            } catch (error) {
                console.log("No video found!")
            }
        }

        for (let i = 0; i < fetchedMovies.length; i++) {
            try {
                var cast = await instanceTMDB.get(`movie/${fetchedMovies[i].id}/credits`)
                fetchedMovies[i].cast = []
                for (let j = 0; j < 10; j++) {
                    fetchedMovies[i].cast[j] = cast.data.cast[j]
                    if (fetchedMovies[i].cast[j].profile_path == null) {
                        fetchedMovies[i].cast[j].profile_path = 'https://www.wildhareboca.com/wp-content/uploads/sites/310/2018/03/image-not-available.jpg'
                    } else {
                        fetchedMovies[i].cast[j].profile_path = 'https://image.tmdb.org/t/p/w500' + fetchedMovies[i].cast[j].profile_path
                    }
                }
            } catch (error) {
                console.log('Cast fetch failed!')
            }
        }
        setMovies(fetchedMovies)
        //#endregion
    }

    useEffect(() => { fetchMovies() }, [])
    
    return (
        <>
            {
                movies.length != 0 ? 
                <SafeAreaView style={{backgroundColor: '#2D6176', height: '100%'}}>
                    <Header navigation={navigation} />

                    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#2D6176'}}>
                        <MainMovies navigation={navigation} movies={movies}/>
                        <CategoriesList navigation={navigation} />
                    </ScrollView>
                    
                </SafeAreaView>
                : <ActivityIndicator size={'large'} color={'lightgrey'} style={{backgroundColor: '#2D6176',flex: 1}}/>
            }
        </>
    )
}

export default MainScreen

