import React, { useState, useRef, useEffect } from 'react'
import { Text, StyleSheet, Image, Dimensions, FlatList, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import CastCard from '../components/CastCard'
import MovieCard from '../components/MovieCard';
import YoutubePlayer from 'react-native-youtube-iframe';
import axios from "axios"

const instanceTMDB = axios.create({ method: 'GET', baseURL: 'https://api.themoviedb.org/3', params: { 'api_key': '1f8884e4f7e6ecb71748ffc3b577ee9f'} })

const MovieDetailsScreen = ({ route, navigation }) => {
    const { id, title, imageUri, genre, released, description, imdbRating, cast, video } = route.params;
    const [imageHeight, setImageHeight] = useState(false)
    const scroll = useRef()
    const [similarMovies, setSimilarMovies] = useState([])

    const fetchSimilarMovies = async () => {
        //#region 
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f&language=en-US&page=1`).then(response => response.json())
        const genres = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f').then(response => response.json())

        let fetchedSimilarMovies = []
        for (let i = 0; i < 10; i++) {
            fetchedSimilarMovies[i] = response.results[i]
            fetchedSimilarMovies[i].image = 'https://image.tmdb.org/t/p/w500' + response.results[i].poster_path
            fetchedSimilarMovies[i].genre = ''
            for (let j = 0; j < genres.genres.length; j++) {
                for (let z = 0; z < genres.genres.length; z++) {
                    if (fetchedSimilarMovies[i].genre_ids[j] == genres.genres[z].id) {
                        fetchedSimilarMovies[i].genre += genres.genres[z].name + (j != fetchedSimilarMovies[i].genre_ids.length - 1 ? ', ' : '')
                    }
                }
            }
        }
        
        for (let i = 0; i < fetchedSimilarMovies.length; i++) {
            try {
                var trailer = await fetch(`https://api.themoviedb.org/3/movie/${fetchedSimilarMovies[i].id}/videos?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f`).then(response => response.json())
                for (let j = 0; j < trailer.results.length; j++) {
                    if (trailer.results[j].type == "Trailer") {
                        fetchedSimilarMovies[i].video = trailer.results[j].key
                        break
                    }
                }
            } catch (error) {
                console.log("No video found!")
            }
        }
        
        for (let i = 0; i < fetchedSimilarMovies.length; i++) {
            var cast = await fetch(`https://api.themoviedb.org/3/movie/${fetchedSimilarMovies[i].id}/credits?api_key=1f8884e4f7e6ecb71748ffc3b577ee9f&language=en-US`).then(response => response.json())
            fetchedSimilarMovies[i].cast = []
            for (let j = 0; j < 10; j++) {
                fetchedSimilarMovies[i].cast[j] = cast.cast[j]
                if (fetchedSimilarMovies[i].cast[j].profile_path == null) {
                    fetchedSimilarMovies[i].cast[j].profile_path = 'https://www.wildhareboca.com/wp-content/uploads/sites/310/2018/03/image-not-available.jpg'
                } else {
                    fetchedSimilarMovies[i].cast[j].profile_path = 'https://image.tmdb.org/t/p/w500' + fetchedSimilarMovies[i].cast[j].profile_path
                }
            }
        }
        
        setSimilarMovies(fetchedSimilarMovies)
        //#endregion
    }
    
    useEffect(() => { fetchSimilarMovies() }, [id])

    return (
        <SafeAreaView style={{ backgroundColor: '#2D6176', height: '100%' }}>
            <ScrollView ref={scroll} showsVerticalScrollIndicator={false} >
                <Image 
                    style={[styles.imageStyle, { height: imageHeight ? 600 : Dimensions.get('window').height / 2}] }
                    source={{uri: imageUri}}
                    onTouchEnd={() => setImageHeight(!imageHeight)}
                />

                <Text style={styles.header}>{title}</Text>
                <Text style={[styles.length, {textAlign: 'center'}]}>{genre}</Text>
                <Text style={styles.length}>Rating: {imdbRating ? imdbRating.toFixed(1.5) : 'No rating yet!'}</Text>
                <Text style={{marginHorizontal: 10, fontSize: 20, textAlign: 'center', color: 'white',}}>{description}</Text>
                <Text style={styles.releaseDate}>Release Date: {released}</Text>
                
                <Text style={styles.castHeader}>Trailer</Text>
                <YoutubePlayer
                    height={230}
                    play={false}
                    videoId={video}
                />

                <Text style={styles.castHeader}>Top Cast</Text>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    keyExtractor={() => Math.random() * 10}
                    data={cast}
                    renderItem={({item}) => item != undefined && <CastCard name={item.name && item.name} character={item.character && item.character} imageUri={item.profile_path && item.profile_path}/>}
                />

                <Text style={styles.castHeader}>Similar Movies</Text>
                {
                    similarMovies.length != 0 ? 
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        keyExtractor={() => Math.random() * 10}
                        data={similarMovies}
                        renderItem={({item}) => 
                            <MovieCard
                                navigation={navigation}
                                id={item.id}
                                title={item.title}
                                imageUri={item.image}
                                genre={item.genre}
                                released={item.release_date}
                                type={item.type}
                                description={item.overview}
                                imdbRating={item.vote_average}
                                video={item.video}
                                cast={item.cast}
                            />
                        }
                    />
                    :<ActivityIndicator size={'large'} color={'lightgrey'} style={{marginVertical: 20,flex: 1}}/>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    imageStyle: {
        alignSelf: 'center',
        width: Dimensions.get('window').width,
    },
    header: {
        fontSize: 30, 
        fontWeight: 'bold',
        color: 'white',
        margin: 10,
        textAlign:'center'    
    },
    length: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 20,
        marginLeft: 10,
        marginBottom: 10,
        alignSelf: 'center'
    },
    releaseDate: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 20,
        marginLeft: 10,
        alignSelf: 'center',
        marginBottom: 20
    },
    castHeader:{
        fontSize: 30, 
        fontWeight: 'bold', 
        color: 'white', 
        alignSelf: 'flex-start', 
        marginLeft: 20, 
        marginBottom: 15
    }
})

export default MovieDetailsScreen

