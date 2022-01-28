import React, { useEffect, useState } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, ActivityIndicator } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import MovieCard from '../components/MovieCard';
import axios from 'axios';

const instanceTMDB = axios.create({ method: 'GET', baseURL: 'https://api.themoviedb.org/3', params: { 'api_key': '1f8884e4f7e6ecb71748ffc3b577ee9f'} })

const SearchScreen = ({ navigation }) => {
    const [keyword, setKeyword] = useState('')
    const [movieResult, setMovieResult] = useState([])
    const [showActivityIndicator, setShowActivityIndicator] = useState(false)
    
    ///search/multi?include_adult=false&query=${keyword}
    const searchMovie = async (keyword) => {
        try {
            // const getMovie = await instanceTMDB.get('/search/movie/?query=' + keyword)
            const getMovie = await instanceTMDB.get(`/search/multi?include_adult=true&query=${keyword}`)
            let genres = await instanceTMDB.get('/genre/movie/list');
    
            let searchResult = getMovie.data.results
            for (let i = 0; i < searchResult.length; i++) {
                if(/null$/.test(searchResult[i].poster_path)){
                    searchResult.splice(i, 1)
                    i--
                }
            }

            for (let i = 0; i < searchResult.length; i++) {
                searchResult[i].image = 'https://image.tmdb.org/t/p/w500' + searchResult[i].poster_path
                for (let j = 0; j < genres.data.genres.length; j++) {
                    if (genres.data.genres[j].id == searchResult[i].genre_ids[0]) {
                        searchResult[i].genre = genres.data.genres[j].name
                    }
                }
            }

            for (let i = 0; i < searchResult.length; i++) {
                try {
                    var trailer = await instanceTMDB.get(`/movie/${searchResult[i].id}/videos`)
                    for (let j = 0; j < trailer.data.results.length; j++) {
                        if (trailer.data.results[j].type == "Trailer") {
                            searchResult[i].video = trailer.data.results[j].key
                            break
                        }
                    }
                } catch (error) {
                    console.log("No video found!")
                }
            }

            try {
                for (let i = 0; i < searchResult.length; i++) {
                    var cast = await instanceTMDB.get(`movie/${searchResult[i].id}/credits`)
                    searchResult[i].cast = []
                    for (let j = 0; j < 10; j++) {
                        searchResult[i].cast[j] = cast.data.cast[j]
                        if (searchResult[i].cast[j].profile_path == null) {
                            searchResult[i].cast[j].profile_path = 'https://www.wildhareboca.com/wp-content/uploads/sites/310/2018/03/image-not-available.jpg'
                        } else {
                            searchResult[i].cast[j].profile_path = 'https://image.tmdb.org/t/p/w500' + searchResult[i].cast[j].profile_path
                        }
                    }
                }
            } catch (error) {
                console.log('Cast fetch failed!')
            }
            
            setMovieResult(searchResult)

        } catch (error) {
            console.log('No results!')
        }
    }

    return (
    <>
            <SafeAreaView style={{backgroundColor: '#2D6176', height: '100%'}}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            autoCorrect={false}
                            autoCapitalize={'none'}
                            value={keyword}
                            style={styles.input} 
                            onChangeText={setKeyword}
                            placeholder='Search Movie'
                            placeholderTextColor='white'
                        />
                        <TouchableOpacity onPress={() => {
                                setShowActivityIndicator(true)
                                setMovieResult([])
                                searchMovie(keyword)
                            }
                        }>
                            <AntDesign name="search1" size={35} color="lightgrey" />
                        </TouchableOpacity>
                    </View>

                    {
                        movieResult.length == 0 && showActivityIndicator && keyword.length != 0
                        ? <ActivityIndicator size={'large'} color={'lightgrey'} style={{flex:1}}/>
                        :<FlatList
                            style={{ alignSelf: 'center' }}
                            numColumns={'2'}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={() => Math.random() * 10}
                            data={movieResult}
                            renderItem={({item}) => 
                                <MovieCard
                                    navigation={navigation}
                                    id={item.id && item.id}
                                    title={item.title && item.title}
                                    imageUri={item.image && item.image}
                                    genre={item.genre && item.genre}
                                    released={item.release_date && item.release_date}
                                    type={item.type && item.type}
                                    description={item.overview && item.overview}
                                    imdbID={item.imdbID && item.imdbID}
                                    imdbRating={item.vote_average && item.vote_average}
                                    video={item.video && item.video}
                                    cast={item.cast && item.cast}
                                />
                            }
                        />
                    }
            </SafeAreaView>
    </>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: 15,
        marginBottom: 10,
        borderRadius: 15,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
    },
    input: {
        flex: 1,
        padding: 15,
        color: 'lightgrey',
        fontSize: 18
    }
})

export default SearchScreen


