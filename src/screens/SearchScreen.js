import React, { useState } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, ActivityIndicator } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import MovieCard from '../components/MovieCard';

const SearchScreen = ({ navigation }) => {
    const [keyword, setKeyword] = useState('')
    const [movieResult, setMovieResult] = useState([])
    const [showActivityIndicator, setShowActivityIndicator] = useState(false)
    
    const searchMovie = async (keyword) => {
        try {
            const getMovie = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f&query=${keyword}`).then(response => response.json())
            const genres = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f').then(response => response.json())
            
            let searchResult = getMovie.results
            for (let i = 0; i < searchResult.length; i++) {
                if(/null$/.test(searchResult[i].poster_path)){
                    searchResult.splice(i, 1)
                    i--
                }
            }

            for (let i = 0; i < searchResult.length; i++) {
                searchResult[i].image = 'https://image.tmdb.org/t/p/w500' + searchResult[i].poster_path
                searchResult[i].genre = ''
                if (searchResult[i].media_type == 'movie'){
                    try {
                        for (let j = 0; j < genres.genres.length; j++) {
                            if (genres.genres[j].id == searchResult[i].genre_ids[0]) {
                                searchResult[i].genre = genres.genres[j].name + (j != searchResult[i].genre_ids.length - 1 ? ', ' : '')
                            }
                        }
                    } catch (error) {
                        console.log('Error while getting movie!')
                    }
                }else{
                    try {
                        const movie = await fetch(`https://api.themoviedb.org/3/tv/${searchResult[i].id}?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f`).then(response => response.json())
                        for (let j = 0; j < movie.genres.length; j++) {
                            searchResult[i].genre += movie.genres[j].name + (j != movie.genres.length - 1 ? ', ' : '')
                        }
                    } catch (error) {
                        console.log('Error while getting TV show!')
                    }
                }
            }

            for (let i = 0; i < searchResult.length; i++) {
                try {
                    var trailer = await fetch(`https://api.themoviedb.org/3/${searchResult[i].media_type == 'movie' ? 'movie' : 'tv'}/${searchResult[i].id}/videos?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f`).then(response => response.json())
                    for (let j = 0; j < trailer.results.length; j++) {
                        if (trailer.results[j].type == "Trailer") {
                            searchResult[i].video = trailer.results[j].key
                            break
                        }
                    }
                } catch (error) {
                    console.log("No video found!")
                }
            }

            try {
                for (let i = 0; i < searchResult.length; i++) {
                    var cast = await fetch(`https://api.themoviedb.org/3/${searchResult[i].media_type == 'movie' ? 'movie' : 'tv'}/${searchResult[i].id}/credits?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f&language=en-US`).then(response => response.json())
                    searchResult[i].cast = []
                    for (let j = 0; j < 10; j++) {
                        searchResult[i].cast[j] = cast.cast[j]
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
                                title={item.title ? item.title : item.name}
                                imageUri={/undefined$/.test(item.image) ? 'https://www.wildhareboca.com/wp-content/uploads/sites/310/2018/03/image-not-available.jpg' : item.image}
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


