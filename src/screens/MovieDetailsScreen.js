import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import {casts} from '../cast'

const MovieDetailsScreen = ({ navigation }) => {
    const title = navigation.getParam('title')
    const imageUri = navigation.getParam('imageUri')
    const genre = navigation.getParam('genre')
    const released = navigation.getParam('released')
    const description = navigation.getParam('description')
    const imdbRating = navigation.getParam('imdbRating')

    var movies = () => {
        return (
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', { title: 'Spider-Man: No Way Home', imageUri: 'https://www.themoviedb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg', genre: 'Fantasy', released: 2021, type: 'Movie', description: 'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a Super Hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.', imdbID: '1', imdbRating: 'Not rated yet.' })}>
                    <Image 
                        style={styles.similarMovieImageStyle}
                        source={{uri: 'https://www.themoviedb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg'}}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', { title: 'Spider-Man: No Way Home', imageUri: 'https://www.themoviedb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg', genre: 'Fantasy', released: 2021, type: 'Movie', description: 'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a Super Hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.', imdbID: '2', imdbRating: 'Not rated yet.' })}>
                    <Image 
                        style={styles.similarMovieImageStyle}
                        source={{uri: 'https://www.themoviedb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg'}}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', { title: 'Spider-Man: No Way Home', imageUri: 'https://www.themoviedb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg', genre: 'Fantasy', released: 2021, type: 'Movie', description: 'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a Super Hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.', imdbID: '3', imdbRating: 'Not rated yet.' })}>
                    <Image 
                        style={styles.similarMovieImageStyle}
                        source={{uri: 'https://www.themoviedb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg'}}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    return (
            <ScrollView style={{backgroundColor: '#2D6176'}}>
                <Image 
                    style={styles.imageStyle}
                    source={{uri: imageUri}}
                />

                <Text style={styles.header}>{title}</Text>
                <Text style={styles.length}>{genre}</Text>
                <Text style={styles.length}>Rating: {imdbRating}</Text>
                <Text style={{marginHorizontal: 10, fontSize: 20, textAlign: 'center', color: 'white',}}>{description}</Text>
                <Text style={styles.releaseDate}>Release Date: {released}</Text>
                
                <Text style={styles.castHeader}>Trailer</Text>
                <Image
                    style={{marginBottom: 20, width: '100%', height: 250}}
                    source={{uri: 'https://overclik.com/wp-content/uploads/2021/11/SPIDER-MAN-No-Way-Home-Trailer-2021-2048x1152.jpg'}}
                />

                <Text style={styles.castHeader}>Top Cast</Text>
                
                <View style={{alignItems: 'center', marginBottom: 20, flexDirection: 'row'}}>
                    { // komponent
                     // map -> flatlist
                        casts.map(cast => {
                            return(
                                <View style={{marginLeft: 4, height: 200, width: 120}}>
                                    <Image
                                        style={styles.castImage}
                                        source={{uri: cast.profile_path}}
                                    />
                                    <Text style={styles.castName}>{cast.name}</Text>
                                    <Text style={{textAlign: 'center', width: 120, color: 'lightgrey'}} >{cast.character}</Text>
                                </View>
                            )
                        })
                    }
                </View>

                <Text style={styles.castHeader}>Similar Movies</Text>
                { movies() }
            </ScrollView>
    )
}

const styles = StyleSheet.create({
    imageStyle: {
        alignSelf: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 120,
    },
    header: {
        fontSize: 30, 
        fontWeight: 'bold',
        color: 'white',
        marginTop: 10,
        marginLeft: 10,
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
    },
    castImage:{
        width: 120, 
        height: 120,
        marginBottom: 10,
        borderRadius: 100,
        borderWidth:1, 
        borderColor: 'white'
    },
    castName: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15,
        textAlign: 'center'
    },
    similarMovieImageStyle: {
        width: 115,
        height: 235,
        borderRadius: 20,
        margin: 5,
        borderWidth: 1,
        borderColor: 'lightgrey'
    }
})

export default MovieDetailsScreen

