import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'

const MovieCard = ({navigation, title, imageUri, genre, released, type, description, imdbID, imdbRating}) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', 
            { 
                title, 
                imageUri, 
                genre, 
                released, 
                type, 
                description, 
                imdbID, 
                imdbRating 
            })}>
            <Image 
                style={styles.imageStyle}
                source={{uri: imageUri}}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    imageStyle: {
        width: 115,
        height: 235,
        borderRadius: 20,
        margin: 5,
        borderWidth: 1,
        borderColor: 'lightgrey'
    }
})
export default MovieCard
