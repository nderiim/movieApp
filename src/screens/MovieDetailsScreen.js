import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, StyleSheet, Image, Dimensions, FlatList, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import CastCard from '../components/CastCard';
import MovieCard from '../components/MovieCard';
import { getSimilarMovies } from '../actions'
import { themeContext } from '../context';

const MovieDetailsScreen = ({ route, navigation }) => {
    const theme = useContext(themeContext);
    const dispatch = useDispatch();
    const {similarMovies} = useSelector((state) => state.movieReducer)
    const { id, title, imageUri, genre, released, description, imdbRating, cast, video, categoryName, media_type } = route.params;
    const [imageHeight, setImageHeight] = useState(false)

    useEffect(() => { dispatch(getSimilarMovies(id, media_type, categoryName)) }, [])

    return (
        <SafeAreaView style={{ backgroundColor: theme, height: '100%' }}>
            <ScrollView showsVerticalScrollIndicator={false} >
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
                    renderItem={({item}) => item != undefined && <CastCard name={item.name ? item.name : item.title} character={item.character && item.character} imageUri={item.profile_path && item.profile_path}/>}
                />

                <Text style={styles.castHeader}>Similar {categoryName == 'Popular Tv Shows' || media_type == 'tv' ? 'TV Shows' : 'Movies'}</Text>
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
                                title={categoryName == 'Popular Tv Shows' || item.name ? item.name : item.title}
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

