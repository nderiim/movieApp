import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

const CategoriesList = ({ navigation }) => {

    const movies = () => {
        return (
            <View style={{flexDirection: 'row', marginBottom: 10}}>
                <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', { title: 'Spider-Man: No Way Home', imageUri: 'https://www.themoviedb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg', genre: 'Fantasy', released: 2021, type: 'Movie', description: 'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a Super Hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.', imdbID: '1', imdbRating: 'Not rated yet.' })}>
                    <Image 
                        style={styles.imageStyle}
                        source={{uri: 'https://www.themoviedb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg'}}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', { title: 'Spider-Man: No Way Home', imageUri: 'https://www.themoviedb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg', genre: 'Fantasy', released: 2021, type: 'Movie', description: 'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a Super Hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.', imdbID: '2', imdbRating: 'Not rated yet.' })}>
                    <Image 
                        style={styles.imageStyle}
                        source={{uri: 'https://www.themoviedb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg'}}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', { title: 'Spider-Man: No Way Home', imageUri: 'https://www.themoviedb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg', genre: 'Fantasy', released: 2021, type: 'Movie', description: 'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a Super Hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.', imdbID: '3', imdbRating: 'Not rated yet.' })}>
                    <Image 
                        style={styles.imageStyle}
                        source={{uri: 'https://www.themoviedb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg'}}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View>
            <Text style={styles.header}>Category Name</Text>
            {movies()}

            <Text style={styles.header}>Category Name</Text>
            {movies()}

            <Text style={styles.header}>Category Name</Text>
            {movies()}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 10,
        marginLeft: 10
    },
    imageStyle: {
        width: 115,
        height: 235,
        borderRadius: 20,
        margin: 5,
        borderWidth: 1,
        borderColor: 'lightgrey'
    }
})

export default CategoriesList











