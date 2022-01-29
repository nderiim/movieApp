import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import MainMovies from '../components/MainMovies'
import CategoriesList from '../components/CategoriesList'
import { SvgCssUri } from 'react-native-svg';

const MainScreen = ({ navigation }) => {
    const [movies, setMovies] = useState([])

    const fetchMovies = async () => {
        //#region 
        const response = await fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1f8884e4f7e6ecb71748ffc3b577ee9f').then(response => response.json())
        const genres = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f').then(response => response.json())
        
        let fetchedMovies = []
        for (let i = 0; i < 5; i++) {
            fetchedMovies[i] = response.results[i]
            fetchedMovies[i].image = 'https://image.tmdb.org/t/p/w500' + response.results[i].poster_path
            fetchedMovies[i].genre = ''
            for (let j = 0; j < genres.genres.length; j++) {
                for (let z = 0; z < genres.genres.length; z++) {
                    if (fetchedMovies[i].genre_ids[j] == genres.genres[z].id) {
                        fetchedMovies[i].genre += genres.genres[z].name + (j != fetchedMovies[i].genre_ids.length - 1 ? ', ' : '')
                    }
                }
            }
        }
        
        for (let i = 0; i < fetchedMovies.length; i++) {
            try {
                var trailer = await fetch(`https://api.themoviedb.org/3/movie/${fetchedMovies[i].id}/videos?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f`).then(response => response.json())
                for (let j = 0; j < trailer.results.length; j++) {
                    if (trailer.results[j].type == "Trailer") {
                        fetchedMovies[i].video = trailer.results[j].key
                        break
                    }
                }
            } catch (error) {
                console.log("No video found!")
            }
        }

        for (let i = 0; i < fetchedMovies.length; i++) {
            try {
                var cast = await fetch(`https://api.themoviedb.org/3/movie/${fetchedMovies[i].id}/credits?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f&language=en-US`).then(response => response.json())
                fetchedMovies[i].cast = []
                for (let j = 0; j < 10; j++) {
                    fetchedMovies[i].cast[j] = cast.cast[j]
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
                    
                    <View style={{ borderBottomColor: 'lightgrey', borderBottomWidth: '0.2'}}>
                        <SvgCssUri
                            style={styles.logo} 
                            uri="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"
                        />
                    </View>

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

const styles = StyleSheet.create({
    logo:{
        height: 40, 
        margin: 15
    }
})

export default MainScreen

