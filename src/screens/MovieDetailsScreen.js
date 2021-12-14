import React, { useState, useRef } from 'react'
import { Text, StyleSheet, Image, Dimensions, FlatList, ScrollView, SafeAreaView } from 'react-native'
import CastCard from '../components/CastCard'
import MovieCard from '../components/MovieCard';
import { casts } from '../cast'
import { movies } from '../movies';

const MovieDetailsScreen = ({ navigation }) => {
    const title = navigation.getParam('title')
    const imageUri = navigation.getParam('imageUri')
    const genre = navigation.getParam('genre')
    const released = navigation.getParam('released')
    const description = navigation.getParam('description')
    const imdbRating = navigation.getParam('imdbRating')
    const [imageHeight, setImageHeight] = useState(false)
    const scroll = useRef()

    const goToTop = () => {
        scroll.current.scrollTo({x: 0, y: 0, animated: true})
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#2D6176', height: '100%' }}>
            <ScrollView ref={scroll} showsVerticalScrollIndicator={false} >
                <Image 
                    style={[styles.imageStyle, { height: imageHeight ? 600 : Dimensions.get('window').height / 2}] }
                    source={{uri: imageUri}}
                    onTouchEnd={() => setImageHeight(!imageHeight)}
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
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    keyExtractor={() => Math.random() * 10}
                    data={casts}
                    renderItem={({item}) => <CastCard name={item.name} character={item.character} imageUri={item.profile_path} />}
                />

                <Text style={styles.castHeader}>Similar Movies</Text>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    keyExtractor={() => Math.random() * 10}
                    data={movies}
                    renderItem={({item}) => 
                        <MovieCard
                            navigation={navigation}
                            title={item.title}
                            imageUri={item.imageUri}
                            genre={item.genre}
                            released={item.released}
                            type={item.type}
                            description={item.description}
                            imdbID={item.imdbID}
                            imdbRating={item.imdbRating}
                            goToTop={goToTop}
                        />
                    }
                />
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
    }
})

MovieDetailsScreen.navigationOptions = () => { return { headerShown: false } }

export default MovieDetailsScreen

