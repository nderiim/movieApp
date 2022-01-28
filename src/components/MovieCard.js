import React from 'react'
import { TouchableOpacity, Image, StyleSheet, Dimensions, Text, View } from 'react-native'

const MovieCard = ({navigation, id, title, imageUri, genre, released, type, description, imdbID, imdbRating, video, cast }) => {
    return (
        <TouchableOpacity 
                onPress={() => navigation.push('MovieDetails',  
                    { 
                        id, 
                        title, 
                        imageUri, 
                        genre, 
                        released, 
                        type, 
                        description, 
                        imdbID, 
                        imdbRating, 
                        video, 
                        cast
                    })
        }>
            <Image 
                style={styles.imageStyle}
                source={{uri: imageUri}}
            />
            <View style={styles.movieTitleContainer}>
                <Text style={styles.movieTitleText}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    imageStyle: {
        width: Dimensions.get("screen").width / 2.2,
        height: Dimensions.get("screen").height / 2.5,
        margin: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'lightgrey',
    },
    movieTitleContainer: {
        width: Dimensions.get("screen").width / 2.2,
        marginBottom: 5,
        paddingLeft: 5,
        alignSelf:'center',
        justifyContent: 'center',
    },
    movieTitleText: {
        color: 'lightgrey',
        fontSize: 16,
        fontWeight: 'bold'
    }
})
export default MovieCard
